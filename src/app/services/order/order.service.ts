import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HOST } from '../host';
import { Game } from '../../types/Game';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  countInCart: number = 0;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    this.checkCart()
  }

  getCountInCart(): number {
    return this.countInCart;
  }

  addToCart(game: Game) {
    const cartStorage = localStorage.getItem('board-cart');

    let cart: any = {};
    if (cartStorage) {
      cart = JSON.parse(cartStorage);
    } else {
      cart.items = [];
    }

    cart.items.push(game.idGame);
    
    localStorage.setItem('board-cart', JSON.stringify(cart));
    this.countInCart++;
  }

  checkCart() {
    const keys = Object.keys(localStorage);
    const cartStorage = keys.find(key => key === 'board-cart');

    if (cartStorage) {
      const cart = JSON.parse(localStorage.getItem('board-cart'));
      this.countInCart = cart.items.length;
    }
  }

  cleanCart() {
    const keys = Object.keys(localStorage);
    const cartStorage = keys.find(key => key === 'board-cart');

    if (cartStorage) {
      localStorage.removeItem(cartStorage);
      this.countInCart = 0;
    }
  }

  getGames(): Observable<Game[]> {
    const keys = Object.keys(localStorage);
    const cartStorage = keys.find(key => key === 'board-cart');
    if (!cartStorage) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem('board-cart'));

    return this.http.post<Game[]>(`${HOST}/games/list`, {
        gameIds: cart.items
      }, this.httpOptions).pipe(
        catchError(this.handleError<Game[]>('Failed to get a llist of games by id', null))
      );
  }

  createOrder(games: Game[]): Observable<void> {
    let httpHeaders = {...this.httpOptions};
    httpHeaders.headers.set('Authorization', `Bearer ${this.sessionService.getToken()}`)
    return this.http.post<any>(`${HOST}/order/create`, {
      gameIds: games.map(game => game.idGame)
    }, this.httpOptions).pipe(
      catchError(this.handleError<any>('Failed to create an order', null))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

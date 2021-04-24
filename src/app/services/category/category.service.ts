import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HOST } from '../host';
import { Category } from '../../types/Game';
import { CategoriesRequest } from './types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /** POST: categories with games */
  getCategoriesWithGames(page_number: number): Observable<Category[]> {
    const categoriesRequest: CategoriesRequest = {
      page_number,
      category_count: 10,
      game_count: 5
    }
    return this.http.post<Category[]>(`${HOST}/categories/games`, categoriesRequest, this.httpOptions).pipe(
      catchError(this.handleError<Category[]>('Failed getting a list of categories', []))
    );
  }

  /** GET: categories */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${HOST}/categories/list`, this.httpOptions).pipe(
      catchError(this.handleError<Category[]>('Failed getting a list of categories', []))
    );
  }

  getGamesByCategories(categories: Category[]): Observable<Category[]> {
    const requestBody = {
      categories: categories.map(category => category.idCategories)
    }

    return this.http.post<Category[]>(`${HOST}/categories/search/list`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError<Category[]>('Failed to get games by categories', []))
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

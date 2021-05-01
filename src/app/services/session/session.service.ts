import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HOST } from '../host';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  isAuthorized: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
    this.checkIfAuthorized();
  }

  checkIfAuthorized() {
    const keys = Object.keys(localStorage);
    const userTokenKey = keys.find(key => key.startsWith('board-token-'));
    if (userTokenKey) {
      this.isAuthorized = true;
    }
  }

  saveToken(user: User, token: string) {
    localStorage.setItem(`board-token-${user.username}`, token);
    this.isAuthorized = true;
  }

  getToken(): string {
    if (this.isAuthorized) {
      const keys = Object.keys(localStorage);
      const userTokenKey = keys.find(key => key.startsWith('board-token-'));
      if (userTokenKey) {
        return localStorage.getItem(userTokenKey);
      }
    }

    return '';
  }

  /** POST: login */
  login(user: User): Observable<any> {
    return this.http.post<User>(`${HOST}/login`, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('login failed'))
    );
  }

  /** POST: register */
  register(user: User): Observable<any> {
    return this.http.post<User>(`${HOST}/register`, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('Registration failed'))
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
      return throwError({
        status: error.status
      });
    };
  }
}

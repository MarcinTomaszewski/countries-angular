import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { AuthResData } from '../utils/data';
import { User } from '../views/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY = 'AIzaSyCcpQiBVgwm23CK_3kfgN-8gQJVPfnAgdU';

  userObs = new Subject<User>();
  token$ = new BehaviorSubject<string>('');
  token: string | null = '';
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResData> {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn)
        )
      );
  }

  login(email: string, password: string): Observable<AuthResData> {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) =>
          this.handleAuth(res.email, res.localId, res.idToken, +res.expiresIn)
        )
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //+konwertuje na liczbę

    const user = new User(email, userId, token, expirationDate);
    this.userObs.next(user);
    this.token = user.token;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(() => new Error(errorRes.toString()));

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email axists already!';
        break;
      case 'EMAIL_NOT_EXISTS':
        errorMessage = 'This email does not exists.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.!';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}

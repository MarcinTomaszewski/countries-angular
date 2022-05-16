import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

interface AuthResData {
  idToken: string; //	A Firebase Auth ID token for the newly created user.
  email: string; //	The email for the newly created user.
  refreshToken: string; //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; //The number of seconds in which the ID token expires.
  localId: string; //	The uid of the newly created user.
  registred?: boolean; //Whether the email is for an existing account.
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY = 'AIzaSyCcpQiBVgwm23CK_3kfgN-8gQJVPfnAgdU';
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResData> {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error)
            return throwError(() => new Error(errorRes.toString()));

          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email axists already!';
              break;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  login(email: string, password: string): Observable<AuthResData> {
    return this.http.post<AuthResData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  exhaustMap,
  map,
  Observable,
  switchMap,
  take,
} from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Country } from '../utils/data';
import { AuthGoogleService } from './auth-google.service';

// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private countriesUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries.json';
  private countryUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries/';
  isLoaded$ = new BehaviorSubject<boolean>(false);
  token = '';
  constructor(
    private http: HttpClient,
    private auth: AuthGoogleService,
    private authFire: Auth
  ) {}

  getCountries(): Observable<Country[]> {
    this.isLoaded$.next(true);
    return this.auth.userObs.pipe(
      take(1),
      switchMap((user) => {
        this.token = user.token;
        return this.http.get<Country[]>(
          this.countriesUrl + '?auth=' + user.token
        );
      }),
      map((countries) => {
        let newCountries: Country[] = [];
        for (const key in countries) {
          if (countries.hasOwnProperty(key)) {
            newCountries.push({
              ...countries[key],
              id: key,
              cities: [{ name: 'Warsaw' }],
            });
          }
        }
        return newCountries;
      })
    );
  }

  getCountry(id: string): Observable<Country> {
    // if (!this.token) {
    //   return this.auth.tokenObs.pipe(
    //     switchMap((token) => {
    //       return this.http.get<Country>(
    //         this.countryUrl + id + '.json?auth=' + token
    //       );
    //     })
    //   );
    // } else {
    return this.http.get<Country>(
      this.countryUrl + id + '.json?auth=' + this.token
    );
    // }
  }

  editCountry(id: string, newCountry: Country): Observable<Country> {
    return this.http.put<Country>(
      `${this.countryUrl}${id}.json?auth=${this.token}`,
      newCountry
    );
  }
  addCountry(newCountry: Country): Observable<{ name: string }> {
    newCountry = { ...newCountry, favorite: false };

    return this.http.post<{ name: string }>(
      this.countriesUrl + '?auth=' + this.token,
      newCountry
    );
  }

  deleteCountry(id: string): Observable<null> {
    return this.http.delete<null>(
      this.countryUrl + id + '.json?auth=' + this.token
    );
  }

  setIsLoaded(value: boolean) {
    this.isLoaded$.next(value);
  }
}

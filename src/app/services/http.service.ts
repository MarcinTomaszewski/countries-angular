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
import { Country } from '../utils/data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private countriesUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries.json';
  private countryUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries/';
  isLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private auth: AuthService) {}

  getCountries(): Observable<Country[]> {
    this.isLoaded$.next(true);
    return this.auth.userObs.pipe(
      take(1),
      exhaustMap((user) => {
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
    return this.http.get<Country>(
      this.countryUrl + id + '.json?auth=' + this.auth.token
    );
  }

  editCountry(id: string, newCountry: Country): Observable<Country> {
    return this.http.put<Country>(
      `${this.countryUrl}${id}.json?auth=${this.auth.token}`,
      newCountry
    );
  }
  addCountry(newCountry: Country): Observable<{ name: string }> {
    newCountry = { ...newCountry, favorite: false };
    return this.http.post<{ name: string }>(
      this.countriesUrl + '?auth=' + this.auth.token,
      newCountry
    );
  }

  deleteCountry(id: string): Observable<null> {
    return this.http.delete<null>(
      this.countryUrl + id + '.json?auth=' + this.auth.token
    );
  }

  setIsLoaded(value: boolean) {
    this.isLoaded$.next(value);
  }
}

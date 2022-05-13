import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Country } from '../utils/data';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private countriesUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries.json';
  private countryUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries/';
  isLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    this.isLoaded$.next(true);
    return this.http.get<Country[]>(this.countriesUrl).pipe(
      map((countries) => {
        let newCountries: Country[] = [];
        for (const key in countries) {
          if (countries.hasOwnProperty(key)) {
            newCountries.push({ ...countries[key], id: key });
          }
        }
        return newCountries;
      })
    );
  }

  getCountry(id: string): Observable<Country> {
    return this.http.get<Country>(this.countryUrl + id + '.json');
  }

  editCountry(id: string, newCountry: Country): Observable<Country> {
    return this.http.put<Country>(this.countryUrl + id + '.json', newCountry);
  }

  addCountry(newCountry: Country): Observable<{ name: string }> {
    newCountry = { ...newCountry, favorite: false };
    return this.http.post<{ name: string }>(this.countriesUrl, newCountry);
  }

  deleteCountry(id: string): Observable<null> {
    return this.http.delete<null>(this.countryUrl + id + '.json');
  }

  setIsLoaded(value: boolean) {
    this.isLoaded$.next(value);
  }
}

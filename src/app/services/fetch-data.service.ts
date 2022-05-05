import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../utils/data';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private countriesUrl = 'https://restcountries.com/v2/all';
  private countryUrl = 'https://restcountries.com/v2/name/';
  isLoaded = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  private createCountry(countries: Country[]): Country[] {
    return countries.reduce((acc: Country[], country) => {
      const {
        name,
        population,
        flag,
        region,
        capital,
        nativeName,
        alpha2Code,
        alpha3Code,
        numericCode,
      } = country;
      const newCountry = {
        name,
        population,
        flag,
        region,
        id: Math.random(),
        cities: [{ name: 'Warsaw' }, { name: 'Berlin' }],
        capital,
        nativeName,
        alpha2Code,
        alpha3Code,
        numericCode,
      };
      acc.push(newCountry);
      return acc;
    }, []);
  }

  setIsLoaded(value: boolean) {
    this.isLoaded.next(value);
  }

  getCountries(): Observable<Country[]> {
    this.isLoaded.next(true);
    return this.http.get<Country[]>(this.countriesUrl).pipe(
      map((countries) => {
        return this.createCountry(countries);
      })
    );
  }

  getCountry(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryUrl + name).pipe(
      map((countries) => {
        return this.createCountry(countries);
      })
    );
  }
}

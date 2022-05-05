import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Country } from '../utils/data';
import { FetchDataService } from './fetch-data.service';

const initialValue = {
  name: '',
  region: '',
  population: 0,
  flag: '',
  cities: [],
  id: 0,
  capital: '',
  nativeName: '',
  alpha2Code: '',
  alpha3Code: '',
  numericCode: '',
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  country: Country[] = [initialValue];
  countries: Country[] = [];
  countryLength = new Subject<number>();
  countryObs = new BehaviorSubject<Country[]>(this.country);
  countriesObs = new BehaviorSubject<Country[]>([]);

  constructor(private fetchData: FetchDataService) {}

  getCountries(): Observable<Country[]> {
    this.fetchData.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.countriesObs.next(countries);
      this.fetchData.setIsLoaded(false);
      this.countryLength.next(countries.length);
    });

    return this.countriesObs;
  }

  getCountry(name: string): Observable<Country[]> {
    this.country = this.countries.filter((country) => country.name === name);
    this.countryObs.next(this.country);
    return this.countryObs;
  }

  getCountryFromApi(name: string) {
    this.fetchData.getCountry(name).subscribe((country) => {
      this.country = country;
      this.countryObs.next(this.country);
    });
    return this.countryObs;
  }

  getCountryObj(name: string): Country | undefined {
    return this.countries.find((country) => country.name === name);
  }

  searchCountries(value: string) {
    const searchCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    this.countriesObs.next(searchCountries);
    this.countryLength.next(searchCountries.length);
  }

  addCountry(country: Country) {
    this.countries.unshift(country);
    this.countriesObs.next(this.countries);
  }

  editCountry(name: string, newCountry: Country) {
    this.countries = this.countries.filter((country) => country.name !== name);
    this.countries.unshift(newCountry);
    this.countriesObs.next(this.countries);
  }
}

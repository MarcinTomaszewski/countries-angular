import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Country } from '../utils/data';
import { FetchDataService } from './fetch-data.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  country: Country[] = [];
  countries: Country[] = [];
  favorite: Country[] = [];
  inputValue = '';
  countryLength = new Subject<number>();
  countryObs = new BehaviorSubject<Country[]>(this.country);
  countriesObs = new BehaviorSubject<Country[]>(this.countries);
  favoriteObs = new BehaviorSubject<Country[]>([]);
  inputValueObs = new BehaviorSubject<string>('');

  constructor(
    private fetchData: FetchDataService,
    private localStorageService: LocalStorageService
  ) {}

  saveInputValue(value: string) {
    this.inputValue = value;
    this.inputValueObs.next(this.inputValue);
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
    const countries = this.countries.map((country) => {
      if (country.name === name) {
        country = { ...country, ...newCountry };
      }
      return country;
    });
    this.countries = countries;
    this.countriesObs.next(this.countries);
    const favorite = this.favorite.map((country) => {
      if (country.name === name) country = { ...country, ...newCountry };
      return country;
    });
    this.favorite = favorite;
    this.favoriteObs.next(this.favorite);
    this.localStorageService.setCountries(this.countries);
    this.localStorageService.setFavoriteCountries(this.favorite);
  }

  toggleFavorite(name: string) {
    this.countries.map((country) => {
      if (country.name === name && !country.favorite) {
        country.favorite = true;
        this.favorite.push(country);
        this.favoriteObs.next(this.favorite.slice());
        this.localStorageService.setFavoriteCountries(this.favorite.slice());
        this.localStorageService.setCountries(this.countries);
      } else if (country.name === name && country.favorite) {
        country.favorite = false;
        this.favorite = this.favorite.filter(
          (country) => country.name !== name
        );
        this.favoriteObs.next(this.favorite.slice());
        this.localStorageService.setFavoriteCountries(this.favorite.slice());
        this.localStorageService.setCountries(this.countries);
      }
      return country;
    });
  }

  deleteCountry(name: string) {
    this.favorite = this.favorite.filter((country) => country.name !== name);
    this.countries = this.countries.filter((country) => country.name !== name);
    this.favoriteObs.next(this.favorite);
    this.countriesObs.next(this.countries);
    if (this.country[0].name === name) {
      this.countryObs.next([this.countries[Math.floor(Math.random() * 100)]]);
    }
  }
}

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
  inputValue = '';
  countryLength = new Subject<number>();
  countryObs = new BehaviorSubject<Country[]>(this.country);
  countriesObs = new BehaviorSubject<Country[]>(this.countries);
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
        country = {
          ...country,
          name: newCountry.name,
          capital: newCountry.capital,
          region: newCountry.region,
          population: newCountry.population,
          flag: newCountry.flag,
          cities: newCountry.cities,
          nativeName: newCountry.nativeName,
          alpha2Code: newCountry.alpha2Code,
          alpha3Code: newCountry.alpha3Code,
          numericCode: newCountry.numericCode,
        };
      }
      return country;
    });
    this.countries = countries;
    this.countriesObs.next(this.countries);
    this.localStorageService.setCountries(this.countries);
  }

  toggleFavorite(name: string) {
    this.countries = this.countries.map((country) => {
      if (country.name === name && !country.favorite) {
        country.favorite = true;
        return country;
      } else if (country.name === name && country.favorite) {
        country.favorite = false;
        return country;
      }

      this.countriesObs.next(this.countries);
      this.localStorageService.setCountries(this.countries);
      return country;
    });
  }

  deleteCountry(name: string) {
    this.countries = this.countries.filter((country) => country.name !== name);
    this.countriesObs.next(this.countries);
    if (this.country[0].name === name) {
      this.countryObs.next([this.countries[Math.floor(Math.random() * 100)]]);
    }
  }

  getCountriesFromLocaleStorage(numRandom: number) {
    const countries = this.localStorageService.getCountries();
    const country = countries[numRandom];

    this.countries = countries;
    this.country = [country];
    this.countryObs.next([country]);
    this.countriesObs.next(countries);
    this.countryLength.next(countries.length);
  }

  initCountries(numRandom: number) {
    this.fetchData.getCountries().subscribe((countries) => {
      const country = countries[numRandom];
      this.countries = countries;
      this.country = [country];
      this.countryObs.next([country]);
      this.countriesObs.next(countries);
      this.countryLength.next(countries.length);
      this.fetchData.setIsLoaded(false);

      this.localStorageService.setCountries(countries);
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Country } from '../utils/data';
import { FetchDataService } from './fetch-data.service';

// const initialValue = {
//   name: '',
//   region: '',
//   population: 0,
//   flag: '',
//   cities: [],
//   id: 0,
//   capital: '',
//   nativeName: '',
//   alpha2Code: '',
//   alpha3Code: '',
//   numericCode: '',
//   favorite: false,
// };

@Injectable({
  providedIn: 'root',
})
export class DataService {
  country: Country[] = [];
  countries: Country[] = [];
  favorite: Country[] = [];
  countryLength = new Subject<number>();
  countryObs = new BehaviorSubject<Country[]>(this.country);
  countriesObs = new BehaviorSubject<Country[]>([]);
  favoriteObs = new BehaviorSubject<Country[]>([]);

  constructor(private fetchData: FetchDataService) {}

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

  toggleFavorite(name: string) {
    this.countries.map((country) => {
      if (country.name === name && !country.favorite) {
        country.favorite = true;
        this.favorite.push(country);
        this.favoriteObs.next(this.favorite.slice());
      } else if (country.name === name && country.favorite) {
        country.favorite = false;
        this.favorite = this.favorite.filter(
          (country) => country.name !== name
        );
        this.favoriteObs.next(this.favorite.slice());
      }
      return country;
    });
  }

  deleteCountry(name: string) {
    this.favorite = this.favorite.filter((country) => country.name !== name);
    this.countries = this.countries.filter((country) => country.name !== name);
    this.favoriteObs.next(this.favorite);
    this.countriesObs.next(this.countries);
  }
}

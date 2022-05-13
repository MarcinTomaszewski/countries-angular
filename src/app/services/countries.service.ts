import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../utils/data';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countries: Country[] = [];
  countries$ = new BehaviorSubject<Country[]>(this.countries);
  inputValue = '';
  inputValue$ = new BehaviorSubject<string>('');

  constructor(private http: HttpService) {}

  getCountries() {
    this.http.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.countries$.next(countries);
      this.http.setIsLoaded(false);
    });
  }

  addCountry(country: Country) {
    this.http.addCountry(country).subscribe((res) => {
      this.countries.unshift({ ...country, id: res.name });
      this.countries$.next(this.countries);
    });
  }

  deleteCountry(id: string) {
    this.http.deleteCountry(id).subscribe();
    this.countries = this.countries.filter((country) => country.id !== id);
    this.countries$.next(this.countries);
  }

  editCountry(id: string, newCountry: Country) {
    this.http.editCountry(id, newCountry).subscribe((country) => {
      this.countries = this.countries.map((item) => {
        if (item.id === country.id) {
          item = { ...item, ...country };
        }
        return item;
      });
      this.countries$.next(this.countries);
    });
  }
  saveInputValue(value: string) {
    this.inputValue = value;
    this.inputValue$.next(this.inputValue);
  }

  searchCountries(value: string) {
    const searchCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    this.countries$.next(searchCountries);
    // this.countryLength.next(searchCountries.length);
  }
}

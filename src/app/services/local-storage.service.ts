import { Injectable } from '@angular/core';
import { Country } from '../utils/data';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setCountries(countries: Country[]) {
    localStorage.setItem('countries', JSON.stringify(countries));
  }

  getCountries(): Country[] {
    const countryList = localStorage.getItem('countries');
    const countries = countryList ? JSON.parse(countryList) : undefined;
    return countries;
  }
  setFavoriteCountries(countries: Country[]) {
    localStorage.setItem('favoriteCountries', JSON.stringify(countries));
  }

  getFavoriteCountries(): Country[] {
    const countryList = localStorage.getItem('favoriteCountries');
    const countries = countryList ? JSON.parse(countryList) : undefined;
    return countries;
  }
}

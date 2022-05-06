import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FetchDataService } from './services/fetch-data.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private data: DataService,
    private fetchData: FetchDataService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let numRandom = Math.floor(Math.random() * 100);

    if (localStorage.getItem('favoriteCountries')) {
      const favoriteCountries = this.localStorageService.getFavoriteCountries();
      const countries = this.localStorageService.getCountries();

      this.data.favorite = favoriteCountries;
      this.data.favoriteObs.next(favoriteCountries);
      this.data.countries = countries;
      this.data.countriesObs.next(countries);
      this.data.countryLength.next(countries.length);
    }
    if (localStorage.getItem('countries')) {
      const countries = this.localStorageService.getCountries();
      const country = countries[numRandom];

      this.data.countries = countries;
      this.data.country = [country];
      this.data.countryObs.next([country]);
      this.data.countriesObs.next(countries);
      this.data.countryLength.next(countries.length);
    } else {
      this.fetchData.getCountries().subscribe((countries) => {
        const country = countries[numRandom];
        this.data.countries = countries;
        this.data.country = [country];
        this.data.countryObs.next([country]);
        this.data.countriesObs.next(countries);
        this.data.countryLength.next(countries.length);
        this.fetchData.setIsLoaded(false);

        this.localStorageService.setCountries(countries);
      });
    }
  }
}

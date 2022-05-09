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
    const favorite = localStorage.getItem('favoriteCountries');
    const countries = localStorage.getItem('countries');

    if (favorite) {
      this.data.initCountriesWhenFavoriteExistsInLocalStorage();
    }
    if (countries) {
      this.data.initCountriesWhenCountiresExistsInLocalStorage(numRandom);
    } else {
      this.data.initCountriesWhenLocalStorageEmpty(numRandom);
    }
  }
}

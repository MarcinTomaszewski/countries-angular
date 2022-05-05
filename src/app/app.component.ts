import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FetchDataService } from './services/fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.fetchData.getCountries().subscribe((countries) => {
      this.data.countries = countries;
      this.data.countriesObs.next(countries);
      this.fetchData.setIsLoaded(false);
      this.data.countryLength.next(countries.length);
    });
  }
}

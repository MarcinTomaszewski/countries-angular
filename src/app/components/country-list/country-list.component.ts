import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Country } from '../../utils/data';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries$: Observable<Country[]> | undefined;
  isLoaded: boolean | undefined;
  countriesLength = 0;
  constructor(private data: DataService, private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.countries$ = this.data.getCountries();
    this.fetchData.isLoaded.subscribe((isLoaded) => (this.isLoaded = isLoaded));
    this.data.countryLength.subscribe(
      (countriesLength) => (this.countriesLength = countriesLength)
    );
  }

  searchCountries(ref: HTMLInputElement) {
    this.data.searchCountries(ref.value);
  }
}

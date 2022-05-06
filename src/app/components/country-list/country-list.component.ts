import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Country } from '../../utils/data';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  isLoaded: boolean | undefined;
  inputValue = '';
  constructor(private data: DataService, private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.data.countriesObs.subscribe(
      (countries) => (this.countries = countries)
    );
    this.fetchData.isLoaded.subscribe((isLoaded) => (this.isLoaded = isLoaded));
    this.data.inputValueObs.subscribe((value) => (this.inputValue = value));
  }

  searchCountries(ref: HTMLInputElement) {
    this.data.saveInputValue(ref.value);
    this.data.searchCountries(ref.value);
  }
}

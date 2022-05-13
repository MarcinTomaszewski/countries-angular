import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { HttpService } from 'src/app/services/http.service';
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
  constructor(
    private countriesService: CountriesService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.countriesService.countries$.subscribe(
      (countries) => (this.countries = countries)
    );
    this.httpService.isLoaded$.subscribe(
      (isLoaded) => (this.isLoaded = isLoaded)
    );
    this.countriesService.inputValue$.subscribe(
      (value) => (this.inputValue = value)
    );
  }

  searchCountries(ref: HTMLInputElement) {
    this.countriesService.saveInputValue(ref.value);
    this.countriesService.searchCountries(ref.value);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CountriesService } from './services/countries.service';
import { Country } from './utils/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private countriesUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries.json';
  private countryUrl =
    'https://countries-angular-default-rtdb.europe-west1.firebasedatabase.app/countries/';
  countriesApi: Country[] = [];
  constructor(
    private countries: CountriesService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.countries.getCountries();
    //Add data to firebase when base is empty
    // this.http
    //   .get<Country[]>('https://restcountries.com/v2/all')
    //   .subscribe((countries) => (this.countriesApi = countries));
  }

  //Add data to firebase when base is empty
  // saveCountries() {
  //   this.countriesApi.forEach((country) => {
  //     country.cities = [{ name: 'Warsaw' }];
  //     return this.http.post<Country>(this.countriesUrl, country).subscribe();
  //   });
  // }
}

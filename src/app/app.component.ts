import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private countries: CountriesService) {}

  ngOnInit(): void {
    this.countries.getCountries();
  }
}

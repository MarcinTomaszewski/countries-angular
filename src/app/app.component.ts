import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private data: DataService) {}

  ngOnInit(): void {
    let numRandom = Math.floor(Math.random() * 100);
    const countries = localStorage.getItem('countries');

    if (countries) {
      this.data.getCountriesFromLocaleStorage(numRandom);
    } else {
      this.data.initCountries(numRandom);
    }
  }
}

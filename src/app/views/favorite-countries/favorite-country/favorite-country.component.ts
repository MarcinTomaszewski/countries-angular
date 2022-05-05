import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-favorite-country',
  templateUrl: './favorite-country.component.html',
  styleUrls: ['./favorite-country.component.css'],
})
export class FavoriteCountryComponent implements OnInit {
  @Input() country!: Country;
  constructor(private data: DataService) {}

  ngOnInit(): void {}

  toggleFavorite(event: Event, name: string) {
    event.preventDefault();
    this.data.toggleFavorite(name);
  }

  deleteCountry(event: Event, name: string) {
    event.preventDefault();
    this.data.deleteCountry(name);
  }
}

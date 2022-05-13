import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-favorite-country',
  templateUrl: './favorite-country.component.html',
  styleUrls: ['./favorite-country.component.css'],
})
export class FavoriteCountryComponent implements OnInit {
  @Input() country!: Country;
  constructor(private countries: CountriesService) {}

  ngOnInit(): void {}

  toggleFavorite(event: Event, country: Country) {
    event.preventDefault();
    let setFavorite = true;
    if (country.favorite) setFavorite = false;
    this.countries.editCountry(country.id, {
      ...country,
      favorite: setFavorite,
    });
  }

  deleteCountry(event: Event, id: string) {
    event.preventDefault();
    this.countries.deleteCountry(id);
  }
}

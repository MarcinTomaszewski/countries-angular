import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-favorite-countries',
  templateUrl: './favorite-countries.component.html',
  styleUrls: ['./favorite-countries.component.css'],
})
export class FavoriteCountriesComponent implements OnInit {
  favorite: Country[] = [];
  constructor(private countries: CountriesService) {}

  ngOnInit(): void {
    this.countries.countries$
      .pipe(
        map((countries: Country[]) =>
          countries.filter((country) => country.favorite)
        )
      )
      .subscribe((countries) => (this.favorite = countries));
  }
}

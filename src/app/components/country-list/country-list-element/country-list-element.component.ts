import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country-list-element',
  templateUrl: './country-list-element.component.html',
  styleUrls: ['./country-list-element.component.css'],
})
export class CountryListElementComponent {
  @Input() country!: Country;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countries: CountriesService
  ) {}

  toggleFavorite(event: Event, country: Country) {
    event.preventDefault();
    event.stopPropagation();
    let setFavorite = true;
    if (country.favorite) setFavorite = false;
    this.countries.editCountry(country.id, {
      ...country,
      favorite: setFavorite,
    });
  }

  deleteCountry(event: Event, id: string) {
    event.preventDefault();
    event.stopPropagation();
    this.countries.deleteCountry(id);
    this.router.navigate(['/home'], { relativeTo: this.route });
  }
}

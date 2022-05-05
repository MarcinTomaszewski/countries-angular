import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
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
    private data: DataService
  ) {}

  goToCountry(name: string) {
    this.router.navigate([name], { relativeTo: this.route });
  }

  toggleFavorite(event: Event, name: string) {
    event.preventDefault();
    event.stopPropagation();
    this.data.toggleFavorite(name);
  }

  deleteCountry(event: Event, name: string) {
    event.preventDefault();
    event.stopPropagation();
    this.data.deleteCountry(name);
  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country-list-element',
  templateUrl: './country-list-element.component.html',
  styleUrls: ['./country-list-element.component.css'],
})
export class CountryListElementComponent {
  @Input() country!: Country;
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToCountry(name: string) {
    this.router.navigate([name], { relativeTo: this.route });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnInit {
  @Input() isActive!: boolean;
  length = 0;
  constructor(private countries: CountriesService) {}

  ngOnInit(): void {
    this.countries.countries$
      .pipe(
        map((countries: Country[]) =>
          countries.filter((country) => country.favorite)
        )
      )
      .subscribe((countries) => (this.length = countries.length));
  }
}

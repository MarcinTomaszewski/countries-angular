import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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

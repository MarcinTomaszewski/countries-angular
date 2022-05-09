import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnInit {
  @Input() isActive!: boolean;
  favoriteLength = 0;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.countriesObs
      .pipe(
        map((countries: Country[]) =>
          countries.filter((country) => country.favorite)
        )
      )
      .subscribe((countries) => (this.favoriteLength = countries.length));
    // this.data.favoriteObs.subscribe(
    //   (countries) => (this.favoriteLength = countries.length)
    // );
  }
}

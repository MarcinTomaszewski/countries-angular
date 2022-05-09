import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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

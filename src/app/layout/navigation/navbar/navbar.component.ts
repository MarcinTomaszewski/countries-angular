import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  length = 0;
  isLogged = false;
  userSub!: Subscription;
  constructor(private countries: CountriesService, private auth: AuthService) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.auth.userObs.subscribe((user) => {
      this.isLogged = !!user; //!user ? false : true;
    });
    this.countries.countries$
      .pipe(
        map((countries: Country[]) =>
          countries.filter((country) => country.favorite)
        )
      )
      .subscribe((countries) => (this.length = countries.length));
  }
}

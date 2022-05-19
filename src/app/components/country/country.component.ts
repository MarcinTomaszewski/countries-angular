import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { CountriesService } from 'src/app/services/countries.service';
import { HttpService } from 'src/app/services/http.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit, OnDestroy {
  country!: Country | undefined;
  id = '-N2GJK2MPLHX_Vgytg-Z';
  isLoaded: boolean | undefined;
  isEdit = false;
  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private countries: CountriesService,
    private auth: AuthGoogleService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // if (!params['id']) {
      //   this.countries.getCountry(this.id).subscribe((country) => {
      //     this.country = country;
      //     this.isEdit = false;
      //   });
      // } else {
      this.sub = this.countries
        .getCountry(params['id'])
        .subscribe((country) => {
          console.log('tutaj');
          this.country = { ...country, id: params['id'] };
          this.isEdit = false;
        });
      // }
    });
  }

  setEdit(value: boolean) {
    this.isEdit = value;

    this.countries.countries$.subscribe((countries) => {
      this.country = countries.find(
        (country) => country.id === this.country?.id
      );
    });
    this.isEdit = false;
  }

  handleEdit() {
    this.isEdit = true;
  }
}

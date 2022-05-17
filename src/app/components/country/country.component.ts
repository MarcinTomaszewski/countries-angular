import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import { HttpService } from 'src/app/services/http.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  country!: Country | undefined;
  id = '-N2GJK2MPLHX_Vgytg-Z';
  isLoaded: boolean | undefined;
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private countries: CountriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        this.http.getCountry(this.id).subscribe((country) => {
          this.country = country;
          this.isEdit = false;
        });
      } else {
        this.http.getCountry(params['id']).subscribe((country) => {
          this.country = { ...country, id: params['id'] };
          this.isEdit = false;
        });
      }
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

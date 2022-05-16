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
  country!: Country;
  id = '-N1sV3apb6CMVmW71F6D';
  isLoaded: boolean | undefined;
  constructor(
    private route: ActivatedRoute,
    private countries: CountriesService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        // console.log('bez params');
        this.http
          .getCountry(this.id)
          .subscribe((country) => (this.country = country));
      } else {
        // console.log('sa params');
        this.http
          .getCountry(params['id'])
          .subscribe((country) => (this.country = country));
      }
    });
  }
}

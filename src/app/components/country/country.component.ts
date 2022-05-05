import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  name = 'Poland';
  countryObs$!: Observable<Country[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      params['name']
        ? (this.countryObs$ = this.data.getCountry(params['name']))
        : (this.countryObs$ = this.data.getCountryFromApi(this.name));
    });
  }
}

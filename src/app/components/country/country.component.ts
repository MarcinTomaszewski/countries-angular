import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  countryObs$!: Observable<Country[]>;

  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      params['name']
        ? (this.countryObs$ = this.data.getCountry(params['name']))
        : (this.countryObs$ = this.data.countryObs);
    });
  }
}

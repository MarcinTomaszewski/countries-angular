import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        this.http
          .getCountry(this.id)
          .subscribe((country) => (this.country = country));
      } else {
        this.http
          .getCountry(params['id'])
          .subscribe((country) => (this.country = country));
      }
    });
  }
}

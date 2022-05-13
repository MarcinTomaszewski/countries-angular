import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css'],
})
export class NewCountryComponent implements OnInit {
  countryForm!: FormGroup;
  active = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countries: CountriesService
  ) {}

  get controls() {
    // console.log((<FormArray>this.countryForm.get('cities')).controls);
    return (<FormArray>this.countryForm.get('cities')).controls;
  }

  ngOnInit(): void {
    this.active ? false : undefined;
    this.initCountryForm();
  }

  onAddCity() {
    (<FormArray>this.countryForm.get('cities')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }
  onDeleteCity(index: number) {
    (<FormArray>this.countryForm.get('cities')).removeAt(index);
  }

  initCountryForm() {
    let name = '';
    let capital = '';
    let region = '';
    let population = 0;
    let flag = '';
    let cities = new FormArray([]);
    let nativeName = '';
    let alpha2Code = '';
    let alpha3Code = '';
    let numericCode = '';

    this.countryForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      capital: new FormControl(capital, Validators.required),
      region: new FormControl(region, Validators.required),
      population: new FormControl(population, Validators.required),
      flag: new FormControl(flag, Validators.required),
      cities: cities,
      nativeName: new FormControl(nativeName, Validators.required),
      alpha2Code: new FormControl(alpha2Code, Validators.required),
      alpha3Code: new FormControl(alpha3Code, Validators.required),
      numericCode: new FormControl(numericCode, Validators.required),
    });
  }

  onSubmit() {
    this.countries.addCountry(this.countryForm.value);
    this.active = true;
    this.countryForm.reset();
    setTimeout(() => {
      this.active = false;
    }, 2000);
  }
}

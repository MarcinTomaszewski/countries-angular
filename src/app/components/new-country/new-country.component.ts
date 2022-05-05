import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.css'],
})
export class NewCountryComponent implements OnInit {
  countryForm!: FormGroup;
  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get controls() {
    // console.log((<FormArray>this.countryForm.get('cities')).controls);
    return (<FormArray>this.countryForm.get('cities')).controls;
  }

  ngOnInit(): void {
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
    let alpha2code = '';
    let alpha3code = '';
    let numericCode = '';

    this.countryForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      capital: new FormControl(capital, Validators.required),
      region: new FormControl(region, Validators.required),
      population: new FormControl(population, Validators.required),
      flag: new FormControl(flag, Validators.required),
      cities: cities,
      nativeName: new FormControl(nativeName, Validators.required),
      alpha2code: new FormControl(alpha2code, Validators.required),
      alpha3code: new FormControl(alpha3code, Validators.required),
      numericCode: new FormControl(numericCode, Validators.required),
    });
  }

  onSubmit() {
    this.data.addCountry(this.countryForm.value);
    this.router.navigate(['/home/' + this.countryForm.value.name], {
      relativeTo: this.route,
    });
  }
}

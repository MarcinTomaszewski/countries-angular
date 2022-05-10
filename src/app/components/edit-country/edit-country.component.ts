import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { City, Country } from 'src/app/utils/data';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
})
export class EditCountryComponent implements OnInit {
  countryForm!: FormGroup;
  name = '';

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
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];
    });

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
    const countryInForm = this.data.getCountryObj(this.name);
    let name = countryInForm?.name;
    let capital = countryInForm?.capital;
    let region = countryInForm?.region;
    let population = countryInForm?.population;
    let flag = countryInForm?.flag;
    let cities = new FormArray([]);
    let nativeName = countryInForm?.nativeName;
    let alpha2Code = countryInForm?.alpha2Code;
    let alpha3Code = countryInForm?.alpha3Code;
    let numericCode = countryInForm?.numericCode;

    if (countryInForm?.['cities']) {
      for (let city of countryInForm?.['cities']) {
        cities.push(
          new FormGroup({
            name: new FormControl(city.name, Validators.required),
          })
        );
      }
    }

    this.countryForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      capital: new FormControl(capital, Validators.required),
      region: new FormControl(region, Validators.required),
      population: new FormControl(population, Validators.required),
      flag: new FormControl(null, Validators.required),
      cities: cities,
      nativeName: new FormControl(nativeName, Validators.required),
      alpha2Code: new FormControl(alpha2Code, Validators.required),
      alpha3Code: new FormControl(alpha3Code, Validators.required),
      numericCode: new FormControl(numericCode, Validators.required),
    });
  }

  onSubmit() {
    this.data.editCountry(this.name, this.countryForm.value);
    this.router.navigate(['/home/' + this.countryForm.value.name], {
      relativeTo: this.route,
    });
  }

  setImageFile(event: Event) {
    const image = document.getElementById('image') as HTMLImageElement;
    const input = event.target as HTMLInputElement;
    const file = input.files as FileList;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // @ts-expect-error:
      image.src = reader.result;
      this.countryForm.value.flag = reader.result;
    });

    reader.readAsDataURL(file[0]);
  }
}

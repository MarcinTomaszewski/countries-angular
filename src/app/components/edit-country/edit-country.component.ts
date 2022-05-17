import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css'],
})
export class EditCountryComponent implements OnInit {
  countryForm!: FormGroup;
  id = '';
  flag: string | ArrayBuffer | null = '';
  countryInForm: Country | undefined = {
    id: '',
    capital: '',
    name: '',
    region: '',
    population: 0,
    flag: '',
    cities: [],
    nativeName: '',
    alpha2Code: '',
    alpha3Code: '',
    numericCode: '',
    favorite: false,
  };
  isEdit = false;
  @Input() country!: Country;
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
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    // });

    // this.countries.countries$.subscribe((countries) => {
    //   let newCountry = countries.find(
    //     (country: Country) => country.id === this.id
    //   );

    // this.countryInForm = newCountry;
    // });

    this.countryInForm = this.country;
    this.id = this.country.id;

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
    let name = this.countryInForm?.name;
    let capital = this.countryInForm?.capital;
    let region = this.countryInForm?.region;
    let population = this.countryInForm?.population;
    let cities = new FormArray([]);
    let nativeName = this.countryInForm?.nativeName;
    let alpha2Code = this.countryInForm?.alpha2Code;
    let alpha3Code = this.countryInForm?.alpha3Code;
    let numericCode = this.countryInForm?.numericCode;
    // @ts-expect-error
    if (this.countryInForm['cities']) {
      // @ts-expect-error
      for (let city of this.countryInForm['cities']) {
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
    this.countries.editCountry(this.id, {
      ...this.countryInForm,
      ...this.countryForm.value,
      flag: this.flag,
    });
    this.router.navigate(['/home/' + this.id], {
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
      this.flag = reader.result;
    });

    reader.readAsDataURL(file[0]);
  }
}

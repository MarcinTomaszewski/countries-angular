import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesService } from 'src/app/services/countries.service';
import { AuthResData } from 'src/app/utils/data';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  error = '';
  isLoading = false;
  authObs!: Observable<AuthResData>;

  constructor(
    private router: Router,
    private auth: AuthGoogleService,
    private countries: CountriesService
  ) {}

  // onSubmit(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;

  //   this.isLoading = true;
  //   if (this.isLoginMode) {
  //     this.authObs = this.auth.login(email, password);
  //   } else {
  //     this.authObs = this.auth.signup(email, password);
  //   }

  //   this.authObs.subscribe({
  //     next: (res) => {
  //       this.isLoading = false;
  //       this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       this.error = error;
  //       this.isLoading = false;
  //     },
  //   });

  //   form.reset();
  // }

  submit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.auth.login({ email, password });
      this.countries.getCountries();
      this.router.navigate(['./home']);
    } else {
      this.auth
        .register({ email, password })
        .then(() => this.router.navigate(['./home']))
        .catch((e) => console.log(e));
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/utils/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    id: 1,
    name: 'Stefcio',
    password: '1234',
    favorite: ['Poland', 'Albania', 'Angola'],
  };
  isLogged = false;
  isError = false;

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.value.name === 'Stefcio' && form.value.password === '1234') {
      this.isLogged = true;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.isError = true;
    }
  }
}

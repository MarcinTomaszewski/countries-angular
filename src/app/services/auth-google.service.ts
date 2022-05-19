import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginData } from '../utils/data';

interface User {
  email: string;
  id: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  user: User = {
    id: '',
    email: '',
    token: '',
  };
  userObs = new Subject<User>();
  tokenObs = new Subject<string>();

  constructor(private auth: Auth, private router: Router) {}

  login({ email, password }: LoginData) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.user.id = res.user.uid;
        this.user.email = res.user.email;
        res.user.getIdTokenResult().then((token) => {
          this.user.token = token.token;
          this.userObs.next(this.user);
          this.tokenObs.next(token.token);
        });
      })
      .catch((err) => console.log(err));
  }
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then((res) => {
      console.log(res);
    });
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  logout() {
    this.user = { id: '', token: '', email: '' };
    this.tokenObs.next('');
    this.userObs.next(null);
    this.router.navigate(['/']);
    // return signOut(this.auth);
  }
}

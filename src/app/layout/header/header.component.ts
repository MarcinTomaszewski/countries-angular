import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGoogleService } from 'src/app/services/auth-google.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuActive = true;
  toggleMenu = false;
  isLogged = false;
  userSub!: Subscription;

  constructor(private auth: AuthGoogleService) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.auth.userObs.subscribe((user) => {
      this.isLogged = !!user; //!user ? false : true;
    });
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    window.innerWidth <= 650
      ? (this.menuActive = false)
      : (this.menuActive = true);
  };

  toggleMenuMobile() {
    this.toggleMenu = !this.toggleMenu;
  }

  logout() {
    this.auth.logout();
  }
}

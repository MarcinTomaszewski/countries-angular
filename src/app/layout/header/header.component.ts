import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuActive = true;
  toggleMenu = false;
  constructor() {}

  ngOnInit(): void {
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
}

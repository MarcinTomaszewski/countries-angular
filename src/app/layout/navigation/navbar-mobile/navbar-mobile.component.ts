import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnInit {
  @Input() isActive!: boolean;
  constructor() {}

  ngOnInit(): void {}
}

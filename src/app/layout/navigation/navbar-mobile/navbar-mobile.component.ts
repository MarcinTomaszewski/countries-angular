import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent implements OnInit {
  @Input() isActive!: boolean;
  favoriteLength = 0;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.favoriteObs.subscribe(
      (countries) => (this.favoriteLength = countries.length)
    );
  }
}

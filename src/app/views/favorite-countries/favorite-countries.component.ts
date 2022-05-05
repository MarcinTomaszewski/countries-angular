import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Country } from 'src/app/utils/data';

@Component({
  selector: 'app-favorite-countries',
  templateUrl: './favorite-countries.component.html',
  styleUrls: ['./favorite-countries.component.css'],
})
export class FavoriteCountriesComponent implements OnInit {
  favoriteObs$!: Observable<Country[]>;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.favoriteObs$ = this.data.favoriteObs;
  }
}

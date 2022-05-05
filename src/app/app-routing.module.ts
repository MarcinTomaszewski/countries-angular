import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteCountriesComponent } from './views/favorite-countries/favorite-countries.component';
import { HomeComponent } from './views/home/home.component';
import { CountryComponent } from './components/country/country.component';
import { NewCountryComponent } from './components/new-country/new-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: CountryComponent },
      { path: 'new', component: NewCountryComponent },
      { path: ':name', component: CountryComponent },
      { path: 'edit/:name', component: EditCountryComponent },
    ],
  },
  { path: 'favorite-countries', component: FavoriteCountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

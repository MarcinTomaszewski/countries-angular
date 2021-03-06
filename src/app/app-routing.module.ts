import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteCountriesComponent } from './views/favorite-countries/favorite-countries.component';
import { HomeComponent } from './views/home/home.component';
import { CountryComponent } from './components/country/country.component';
import { NewCountryComponent } from './components/new-country/new-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { DragAndDropComponent } from './views/drag-and-drop/drag-and-drop.component';
import { FileReaderComponent } from './views/file-reader/file-reader.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: CountryComponent },
      { path: 'login', component: LoginComponent },
      { path: 'add-country', component: NewCountryComponent },
      { path: 'drag-and-drop', component: DragAndDropComponent },
      { path: 'file-reader', component: FileReaderComponent },
      { path: ':id', component: CountryComponent },
      { path: 'edit/:id', component: EditCountryComponent },
    ],
  },
  { path: 'favorite-countries', component: FavoriteCountriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

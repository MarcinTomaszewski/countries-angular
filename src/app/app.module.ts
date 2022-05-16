import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navigation/navbar/navbar.component';
import { NavbarMobileComponent } from './layout/navigation/navbar-mobile/navbar-mobile.component';
import { HomeComponent } from './views/home/home.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';
import { NewCountryComponent } from './components/new-country/new-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { CountryListElementComponent } from './components/country-list/country-list-element/country-list-element.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FavoriteCountriesComponent } from './views/favorite-countries/favorite-countries.component';
import { FavoriteCountryComponent } from './views/favorite-countries/favorite-country/favorite-country.component';
import { DragAndDropComponent } from './views/drag-and-drop/drag-and-drop.component';
import { FileReaderComponent } from './views/file-reader/file-reader.component';
import { AuthComponent } from './views/auth/auth.component';
import { WelcomeComponent } from './views/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NavbarMobileComponent,
    HomeComponent,
    CountryListComponent,
    CountryComponent,
    NewCountryComponent,
    EditCountryComponent,
    CountryListElementComponent,
    SpinnerComponent,
    FavoriteCountriesComponent,
    FavoriteCountryComponent,
    DragAndDropComponent,
    FileReaderComponent,
    AuthComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

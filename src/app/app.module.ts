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
import { CountriesComponent } from './views/countries/countries.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';
import { NewCountryComponent } from './components/new-country/new-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';
import { CountryListElementComponent } from './components/country-list/country-list-element/country-list-element.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NavbarMobileComponent,
    HomeComponent,
    CountriesComponent,
    CountryListComponent,
    CountryComponent,
    NewCountryComponent,
    EditCountryComponent,
    CountryListElementComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./content/login/login.component";
import { HomeComponent } from "./content/home/home.component";
import { RegisterComponent } from "./content/register/register.component";

import { NavigationComponent } from "./navigation/navigation.component";
import { ContentComponent } from "./content/content.component";
import { ProfileComponent } from "./content/profile/profile.component";
import { OffersComponent } from "./content/offers/offers.component";

import { OffersListComponent } from "./content/offers/offers-list/offers-list.component";
import { FriendsDataListComponent } from "./content/profile/friends-data-list/friends-data-list.component";
import { ArchiveDataListComponent } from "./content/profile/archive-data-list/archive-data-list.component";
import { ReservationsDataListComponent } from "./content/profile/reservations-data-list/reservations-data-list.component";
import { EditProfileComponent } from "./content/profile/edit-profile/edit-profile.component";
import { OfferItemComponent } from "./content/offers/offers-list/offer-item/offer-item.component";
import { OfferDetailComponent } from "./content/offers/offer-detail/offer-detail.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CompaniesComponent } from "./content/companies/companies.component";
import { AdminPanelComponent } from "./content/admin-panel/admin-panel.component";
import { AdminFlightsComponent } from "./content/admin-panel/admin-flights/admin-flights.component";
import { from } from "rxjs";
import { CarsListComponent } from "./content/companies/cars-list/cars-list.component";
import { CarItemComponent } from "./content/companies/cars-list/car-item/car-item.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    ContentComponent,
    ProfileComponent,
    OffersComponent,
    OffersListComponent,
    OfferItemComponent,
    FriendsDataListComponent,
    ArchiveDataListComponent,
    ReservationsDataListComponent,
    EditProfileComponent,
    OfferDetailComponent,
    CompaniesComponent,
    AdminPanelComponent,
    AdminFlightsComponent,
    CarsListComponent,
    CarItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

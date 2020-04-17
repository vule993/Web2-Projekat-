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
import { EditAvioProfileComponent } from "./content/admin-panel/admin-flights/edit-avio-profile/edit-avio-profile.component";
import { EditDestinationsComponent } from "./content/admin-panel/admin-flights/edit-destinations/edit-destinations.component";
import { EditFlightsComponent } from "./content/admin-panel/admin-flights/edit-flights/edit-flights.component";
import { EditDiscountComponent } from "./content/admin-panel/admin-flights/edit-discount/edit-discount.component";
import { EditSeatsComponent } from "./content/admin-panel/admin-flights/edit-seats/edit-seats.component";
import { EditPricesComponent } from "./content/admin-panel/admin-flights/edit-prices/edit-prices.component";
import { AdminCarsComponent } from "./content/admin-panel/admin-cars/admin-cars.component";
import { EditCarProfileComponent } from './content/admin-panel/admin-cars/edit-car-profile/edit-car-profile.component';
import { EditCarListComponent } from './content/admin-panel/admin-cars/edit-car-list/edit-car-list.component';
import { EditCarPricesComponent } from './content/admin-panel/admin-cars/edit-car-prices/edit-car-prices.component';
import { EditCarStatisticsComponent } from './content/admin-panel/admin-cars/edit-car-statistics/edit-car-statistics.component';
import { EditAdminProfileComponent } from './content/admin-panel/admin-cars/edit-admin-profile/edit-admin-profile.component';

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
    AdminCarsComponent,
    EditAvioProfileComponent,
    EditDestinationsComponent,
    EditFlightsComponent,
    EditDiscountComponent,
    EditSeatsComponent,
    EditPricesComponent,
    EditCarProfileComponent,
    EditCarListComponent,
    EditCarPricesComponent,
    EditCarStatisticsComponent,
    EditAdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

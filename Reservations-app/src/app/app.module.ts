import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material.module";

import { SafePipeModule } from "safe-pipe";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";

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

import { CompaniesComponent } from "./content/companies/companies.component";
import { AdminPanelComponent } from "./content/admin-panel/admin-panel.component";
import { AdminFlightsComponent } from "./content/admin-panel/admin-flights/admin-flights.component";
import { from } from "rxjs";

import { EditAvioProfileComponent } from "./content/admin-panel/admin-flights/edit-avio-profile/edit-avio-profile.component";
import { EditDestinationsComponent } from "./content/admin-panel/admin-flights/edit-destinations/edit-destinations.component";
import { EditFlightsComponent } from "./content/admin-panel/admin-flights/edit-flights/edit-flights.component";
import { EditDiscountComponent } from "./content/admin-panel/admin-flights/edit-discount/edit-discount.component";
import { EditSeatsComponent } from "./content/admin-panel/admin-flights/edit-seats/edit-seats.component";

import { AdminCarsComponent } from "./content/admin-panel/admin-cars/admin-cars.component";
import { EditCarProfileComponent } from "./content/admin-panel/admin-cars/edit-car-profile/edit-car-profile.component";
import { EditCarListComponent } from "./content/admin-panel/admin-cars/edit-car-list/edit-car-list.component";
import { EditCarPricesComponent } from "./content/admin-panel/admin-cars/edit-car-prices/edit-car-prices.component";
import { EditCarStatisticsComponent } from "./content/admin-panel/admin-cars/edit-car-statistics/edit-car-statistics.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CarCompaniesComponent } from "./content/companies/car-companies/car-companies.component";
import { CarCompanyProfileComponent } from "./content/companies/car-companies/car-company-profile/car-company-profile.component";

import { AirlinesComponent } from "./content/companies/airlines/airlines.component";
import { SideNavComponent } from "./content/side-nav/side-nav.component";
import { DisplaySeatsComponent } from "./content/display-seats/display-seats.component";
import { UsersService } from "./services/users.service";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HeadAdminComponent } from "./content/admin-panel/head-admin/head-admin.component";
import { UsersComponent } from "./content/admin-panel/head-admin/users/users.component";
import { AdminProfileComponent } from "./content/admin-panel/head-admin/admin-profile/admin-profile.component";
import { SliderComponent } from "./content/slider/slider.component";
import { CompanyListComponent } from "./content/companies/company-list/company-list.component";

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

    AdminCarsComponent,
    EditAvioProfileComponent,
    EditDestinationsComponent,
    EditFlightsComponent,
    EditDiscountComponent,
    EditSeatsComponent,

    EditCarProfileComponent,
    EditCarListComponent,
    EditCarPricesComponent,
    EditCarStatisticsComponent,
    CarCompaniesComponent,

    CarCompanyProfileComponent,
    AirlinesComponent,
    SideNavComponent,
    DisplaySeatsComponent,
    HeadAdminComponent,
    UsersComponent,
    AdminProfileComponent,
    SliderComponent,
    CompanyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
    }),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SafePipeModule,
    HttpClientModule,
  ],
  providers: [
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

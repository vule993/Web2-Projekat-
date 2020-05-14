import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./content/login/login.component";
import { RegisterComponent } from "./content/register/register.component";
import { ContentComponent } from "./content/content.component";
import { ProfileComponent } from "./content/profile/profile.component";
import { OffersComponent } from "./content/offers/offers.component";
import { AdminPanelComponent } from "./content/admin-panel/admin-panel.component";
import { ArchiveDataListComponent } from "./content/profile/archive-data-list/archive-data-list.component";
import { EditProfileComponent } from "./content/profile/edit-profile/edit-profile.component";
import { ReservationsDataListComponent } from "./content/profile/reservations-data-list/reservations-data-list.component";
import { FriendsDataListComponent } from "./content/profile/friends-data-list/friends-data-list.component";
import { HomeComponent } from "./content/home/home.component";
import { CompaniesComponent } from "./content/companies/companies.component";
import { AdminFlightsComponent } from "./content/admin-panel/admin-flights/admin-flights.component";
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

import { CompaniesPageComponent } from "./content/companies/companies-page/companies-page.component";
import { CarCompanyProfileComponent } from "./content/companies/car-companies/car-company-profile/car-company-profile.component";
import { EditBusinessReportComponent } from "./content/admin-panel/admin-flights/edit-business-report/edit-business-report.component";
import { SideNavComponent } from "./content/side-nav/side-nav.component";

const routes: Routes = [
  { path: "", redirectTo: "profile/friends", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "flights", component: OffersComponent },
  { path: "admin-panel", component: AdminPanelComponent },
  {
    path: "companies",
    component: CompaniesComponent,
    children: [
      { path: "", component: CompaniesPageComponent },
      {
        path: "car-company/:id",
        component: CarCompanyProfileComponent
      }
    ]
  },
  { path: "profile", redirectTo: "profile/friends", pathMatch: "full" },
  {
    path: "profile",
    component: ProfileComponent,
    children: [
      { path: "friends", component: FriendsDataListComponent },
      { path: "archive", component: ArchiveDataListComponent },
      { path: "reservations", component: ReservationsDataListComponent },
      { path: "edit-profile", component: EditProfileComponent }
    ]
  },
  {
    path: "admin",
    component: AdminPanelComponent,
    children: [
      {
        path: "avio",
        component: AdminFlightsComponent,
        children: [
          // { path: "", component: SideNavComponent, outlet: "side-nav" },
          { path: "edit-profile", component: EditAvioProfileComponent },
          { path: "destinations", component: EditDestinationsComponent },
          { path: "flights", component: EditFlightsComponent },
          { path: "discount", component: EditDiscountComponent },
          { path: "seat-config", component: EditSeatsComponent },
          { path: "business-report", component: EditBusinessReportComponent }
        ]
      },
      {
        path: "car",
        component: AdminCarsComponent,
        children: [
          // { path: "", component: SideNavComponent, outlet: "side-nav" },
          { path: "edit-company", component: EditCarProfileComponent },
          { path: "cars", component: EditCarListComponent },
          { path: "price-list", component: EditCarPricesComponent },
          { path: "statistics", component: EditCarStatisticsComponent }
        ]
      },
      { path: "archive", component: ArchiveDataListComponent },
      { path: "reservations", component: ReservationsDataListComponent },
      { path: "edit-profile", component: EditProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

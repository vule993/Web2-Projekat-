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

import { EditBusinessReportComponent } from "./content/admin-panel/admin-flights/edit-business-report/edit-business-report.component";
import { SideNavComponent } from "./content/side-nav/side-nav.component";
import { AuthGuard } from "./auth/auth.guard";
import { HeadAdminComponent } from "./content/admin-panel/head-admin/head-admin.component";
import { CarCompaniesComponent } from "./content/companies/car-companies/car-companies.component";
import { AdminProfileComponent } from "./content/admin-panel/head-admin/admin-profile/admin-profile.component";
import { UsersComponent } from "./content/admin-panel/head-admin/users/users.component";
import { AirlinesComponent } from "./content/companies/airlines/airlines.component";
import { RegisterAdminComponent } from "./content/admin-panel/head-admin/register-admin/register-admin.component";
import { AirlineCompanyProfileComponent } from "./content/companies/airlines/airline-company-profile/airline-company-profile.component";
import { CarCompanyProfileComponent } from "./content/companies/car-companies/car-company-profile/car-company-profile.component";
import { ReservationComponent } from "./content/reservation/reservation.component";
import { HeadCarCompaniesComponent } from "./content/admin-panel/head-admin/head-car-companies/head-car-companies.component";
import { HeadAvioCompaniesComponent } from "./content/admin-panel/head-admin/head-avio-companies/head-avio-companies.component";
import { CarReservationComponent } from "./content/reservation/car-reservation/car-reservation.component";
import { CreateCarCompanyComponent } from "./content/admin-panel/head-admin/create-car-company/create-car-company.component";
import { CreateAvioCompanyComponent } from "./content/admin-panel/head-admin/create-avio-company/create-avio-company.component";
import { MailConfirmationComponent } from "./content/mail-confirmation/mail-confirmation.component";
import { UserListComponent } from "./content/user-list/user-list.component";

const routes: Routes = [
  { path: "", redirectTo: "companies/airlines", pathMatch: "full" },

  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "ConfirmEmail/:email", component: MailConfirmationComponent },
  { path: "flights", component: OffersComponent },
  { path: "admin-panel", component: AdminPanelComponent },
  // ovo je samo za redirect, airlines je default komponenta za stranicu companies
  {
    path: "companies",
    redirectTo: "companies/airlines",
    pathMatch: "full",
  },
  {
    path: "companies",
    component: CompaniesComponent,
    children: [
      { path: "airlines", component: AirlinesComponent },
      { path: "airlines/:id", component: AirlineCompanyProfileComponent },
      { path: "car-companies", component: CarCompaniesComponent },
      { path: "car-companies/:id", component: CarCompanyProfileComponent },
    ],
  },
  {
    path: "users-list",
    component: UserListComponent,
  },
  {
    path: "flight/:id",
    component: ReservationComponent,
  },
  {
    path: "avio-reservation/:id",
    component: ReservationComponent,
  },
  {
    path: "car-reservation/:id",
    component: CarReservationComponent,
  },
  {
    path: "profile",
    redirectTo: "profile/friends",
    pathMatch: "full",
    // canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "friends",
        component: FriendsDataListComponent,
      },
      {
        path: "archive",
        component: ArchiveDataListComponent,
      },
      {
        path: "reservations",
        component: ReservationsDataListComponent,
      },
      {
        path: "edit-profile",
        component: EditProfileComponent,
      },
    ],
  },
  {
    //ovo ce biti url kada neko zeli da doda nekoga, pa ce se prikazati samo info, tj bez edit menija
    path: "profile-view",
    component: ProfileComponent,
  },
  {
    path: "admin",
    component: AdminPanelComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "head-admin",
        component: HeadAdminComponent,
        // canActivate: [AuthGuard],
        // data: { permittedRoles: ["Admin"] },
        children: [
          { path: "car-companies", component: HeadCarCompaniesComponent },
          { path: "avio-companies", component: HeadAvioCompaniesComponent },
          { path: "users", component: UsersComponent },
          { path: "profile", component: AdminProfileComponent },
          { path: "register-admin", component: RegisterAdminComponent },
          { path: "create-car-company", component: CreateCarCompanyComponent },
          {
            path: "create-avio-company",
            component: CreateAvioCompanyComponent,
          },
        ],
      },
      {
        path: "avio",
        component: AdminFlightsComponent,
        // canActivate: [AuthGuard],
        data: { permittedRoles: ["AvioAdmin"] },
        children: [
          // { path: "", component: SideNavComponent, outlet: "side-nav" },
          { path: "edit-profile", component: EditAvioProfileComponent },
          { path: "destinations", component: EditDestinationsComponent },
          { path: "flights", component: EditFlightsComponent },
          { path: "discount", component: EditDiscountComponent },
          { path: "seat-config", component: EditSeatsComponent },
          { path: "business-report", component: EditBusinessReportComponent },
        ],
      },
      {
        path: "car",
        component: AdminCarsComponent,
        // canActivate: [AuthGuard],
        data: { permittedRoles: ["CarAdmin"] },
        children: [
          // { path: "", component: SideNavComponent, outlet: "side-nav" },
          { path: "edit-company", component: EditCarProfileComponent },
          { path: "cars", component: EditCarListComponent },
          { path: "price-list", component: EditCarPricesComponent },
          { path: "statistics", component: EditCarStatisticsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

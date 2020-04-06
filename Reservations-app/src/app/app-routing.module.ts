import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./content/login/login.component";
import { RegisterComponent } from "./content/register/register.component";
import { ContentComponent } from "./content/content.component";
import { ProfileComponent } from "./content/profile/profile.component";
import { OffersComponent } from "./content/offers/offers.component";
import { ArchiveDataListComponent } from "./content/profile/archive-data-list/archive-data-list.component";
import { EditProfileComponent } from "./content/profile/edit-profile/edit-profile.component";
import { ReservationsDataListComponent } from "./content/profile/reservations-data-list/reservations-data-list.component";
import { FriendsDataListComponent } from "./content/profile/friends-data-list/friends-data-list.component";
import { HomeComponent } from "./content/home/home.component";

const routes: Routes = [
  { path: "", redirectTo: "profile/friends", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "flights", component: OffersComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

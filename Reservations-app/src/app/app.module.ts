import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./content/login/login.component";
import { RegisterComponent } from "./content/register/register.component";

import { NavigationComponent } from "./navigation/navigation.component";
import { ContentComponent } from "./content/content.component";
import { ProfileComponent } from "./content/profile/profile.component";
import { OffersComponent } from "./content/offers/offers.component";
import { OffersListComponent } from "./content/offers/offers-list/offers-list.component";
import { FriendsDataListComponent } from './content/profile/friends-data-list/friends-data-list.component';
import { ArchiveDataListComponent } from './content/profile/archive-data-list/archive-data-list.component';
import { ReservationsDataListComponent } from './content/profile/reservations-data-list/reservations-data-list.component';
import { EditProfileComponent } from './content/profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    ContentComponent,
    ProfileComponent,
    OffersComponent,
    OffersListComponent,
    FriendsDataListComponent,
    ArchiveDataListComponent,
    ReservationsDataListComponent,
    EditProfileComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

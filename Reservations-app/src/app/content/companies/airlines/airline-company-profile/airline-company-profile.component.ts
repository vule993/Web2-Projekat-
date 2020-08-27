import { Component, OnInit } from "@angular/core";
import { SelectedcompanyService } from "src/app/services/selectedcompany.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { Flight } from "src/app/models/Flight.model";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";

@Component({
  selector: "app-airline-company-profile",
  templateUrl: "./airline-company-profile.component.html",
  styleUrls: ["./airline-company-profile.component.css"],
})
export class AirlineCompanyProfileComponent implements OnInit {
  //google maps

  //
  currentCompany: AirlineCompany;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue; //for stars

  center: google.maps.LatLngLiteral = {
    lat: 51.678418,
    lng: 7.809007,
  };
  zoom = 2;

  constructor(
    private route: ActivatedRoute,
    private selectedcompanyService: SelectedcompanyService,
    private _airlineCompanyService: AviocompaniesService,
    private router: Router,
    private reservationsService: ReservationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let urlParts = window.location.href.split("/");
    let id = urlParts[urlParts.length - 1];
    debugger;
    this._airlineCompanyService.getCompanyById(id).subscribe((company) => {
      debugger;
      this.currentCompany = company as AirlineCompany;
      this.center = {
        lat: this.currentCompany.address.lat,
        lng: this.currentCompany.address.lon,
      };
    });
  }

  getReservationsWithDiscount() {}

  countStar(star) {
    // this.selectedValue = star;
    // console.log("Value of star", star);
    // this.currentCompany.rating = star; //nece ovako moci
  }
}

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
    private router: Router,
    private reservationsService: ReservationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //google maps

    //

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.currentCompany = (this.selectedcompanyService
          .currentCompany as any) as AirlineCompany;
        this.center = {
          lat: +this.currentCompany?.address.lat,
          lng: +this.currentCompany?.address.lon,
        };
      }
    });
    this.selectedcompanyService.currentCompany.subscribe((company) => {
      this.currentCompany = company;
      // this.center = {
      //   lat: +this.currentCompany?.address.lat,
      //   lng: +this.currentCompany?.address.lon,
      // };
    });
  }

  getReservationsWithDiscount() {}

  countStar(star) {
    // this.selectedValue = star;
    // console.log("Value of star", star);
    // this.currentCompany.rating = star; //nece ovako moci
  }
}

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
import { FlightsService } from "src/app/services/flights.service";
import { Seat, Row } from "src/app/models/Seat.model";
import { FastReservationFlight } from "src/app/models/FastReservationFlight.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { fstat } from "fs";

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

  fastSeats: FastReservationFlight[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 51.678418,
    lng: 7.809007,
  };
  zoom = 2;

  constructor(
    private seatConfigService: SeatsConfigService,
    private _airlineCompanyService: AviocompaniesService,
    private flightService: FlightsService
  ) {}

  ngOnInit(): void {
    let urlParts = window.location.href.split("/");
    let id = urlParts[urlParts.length - 1];

    this._airlineCompanyService.getCompanyById(id).subscribe((company) => {
      this.currentCompany = company as AirlineCompany;
      this.center = {
        lat: this.currentCompany.address.lat,
        lng: this.currentCompany.address.lon,
      };
    });

    this.flightService.getAllFlights().subscribe((flights) => {
      let fs: FastReservationFlight;
      (flights as Flight[]).forEach((flight) => {
        let f: Flight = flight;
        //ako je ova kompanija
        if (f.avioCompany.id == this.currentCompany.id) {
          f.seatConfiguration.seats.forEach((row) => {
            row.seats.forEach((seat) => {
              //ako je sediste za brzu rez i ako je slobodno
              if (seat.forFastReservation && seat.passenger == null) {
                fs = new FastReservationFlight(
                  seat.id,
                  f.destinations[0],
                  f.destinations[f.destinations.length - 1],
                  f.startTime + " " + f.startDate,
                  seat.seatNo,
                  f.price,
                  f.discount,
                  localStorage.getItem("userId")
                );
                this.fastSeats.push(fs);
              }
            });
          });
        }
      });
    });
  }

  reserve(seat: FastReservationFlight) {
    this.seatConfigService.updateSeat(seat).subscribe();
    this.fastSeats.forEach((fs, index) => {
      if (fs.id == seat.id) {
        this.fastSeats.splice(index, 1);
      }
    });
  }

  countStar(star) {
    // this.selectedValue = star;
    // console.log("Value of star", star);
    // this.currentCompany.rating = star; //nece ovako moci
  }
}

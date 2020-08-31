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
import { AirlineReservation } from "src/app/models/AirlineReservation";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { CompanyRating } from "src/app/models/CompanyRating.model";

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

  ifRated: boolean = false;

  isOnFlight: Boolean = false;

  center: google.maps.LatLngLiteral = {
    lat: 51.678418,
    lng: 7.809007,
  };
  zoom = 2;

  public months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  constructor(
    private seatConfigService: SeatsConfigService,
    private _airlineCompanyService: AviocompaniesService,
    private _userService: UsersService,
    private _reservationService: ReservationService,
    private flightService: FlightsService
  ) {}

  getMonth(month: string): number {
    return this.months.findIndex((m) => m == month);
  }
  dateCalculate(date: string[] = [], time: string[] = [], differenceHours = 0) {
    let dateObject = new Date();

    dateObject.setDate(+date[0]);
    dateObject.setMonth(this.getMonth(date[1]));
    dateObject.setFullYear(+date[2]);

    dateObject.setHours(+time[0] - differenceHours);
    dateObject.setMinutes(+time[1]);

    return dateObject;
  }

  ngOnInit(): void {
    let urlParts = window.location.href.split("/");
    let id = urlParts[urlParts.length - 1];

    this._airlineCompanyService.getCompanyById(id).subscribe((company) => {
      this.currentCompany = company as AirlineCompany;
      this.center = {
        lat: this.currentCompany.address.lat,
        lng: this.currentCompany.address.lon,
      };
      this._airlineCompanyService
        .getAllCompanyRatings(this.currentCompany.id)
        .subscribe((ratings) => {
          (ratings as CompanyRating[]).forEach((r) => {
            if (r.userEmail == localStorage.getItem("userId")) {
              this.ifRated = true;
            }
          });
        });
    });

    //fastReservationFlight koristice se ipak samo na fronu i sluzi da udruzi podatke za prikaz
    this.flightService.getAllFlights().subscribe((flights) => {
      let fs: FastReservationFlight;
      (flights as Flight[]).forEach((flight) => {
        let f: Flight = flight;

        let flightDate = this.dateCalculate(
          f.startDate.split("-"),
          f.startTime.split(":")
        );
        let currenDate = new Date();

        if (flightDate < currenDate) return;

        debugger;
        //ako je ova kompanija
        if (f.avioCompany.id == this.currentCompany.id) {
          f.seatConfiguration.seats.forEach((row) => {
            row.seats.forEach((seat) => {
              //ako je sediste za brzu rez i ako je slobodno
              if (seat.forFastReservation && seat.passengerEmail == "") {
                let rowWidth =
                  f.seatConfiguration.planeType.segmentOneWidth +
                  f.seatConfiguration.planeType.segmentTwoWidth +
                  f.seatConfiguration.planeType.segmentThreeWidth +
                  f.seatConfiguration.planeType.segmentFourWidth;
                fs = new FastReservationFlight(
                  seat.id,
                  f.destinations[0],
                  f.destinations[f.destinations.length - 1],
                  f.startTime + " " + f.startDate,
                  f.price,
                  f.discount,
                  f.id,
                  seat.seatNo.toString(),
                  Math.ceil(seat.seatNo / rowWidth) - 1,
                  Math.ceil((seat.seatNo - 1) % rowWidth),
                  this.dateCalculate(
                    f.startDate.split("-"),
                    f.startTime.split(":"),
                    3
                  ),
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

  checkIfAlreadyOnFlight(rows: Row[]): boolean {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].seats.length; j++) {
        if (rows[i].seats[j].passengerEmail == localStorage.getItem("userId"))
          return true;
      }
    }

    return false;
  }

  reserve(seat: FastReservationFlight) {
    //this.seatConfigService.updateSeat(seat).subscribe();

    this.flightService.getFlight(seat.flightId).subscribe((flight) => {
      if (
        this.checkIfAlreadyOnFlight((flight as Flight).seatConfiguration.seats)
      ) {
        alert("You already have reservation for this flight!");
        return;
      }
      //ako prodje dodajem
      let reservation = new Reservation(
        0,
        new AirlineReservation(
          0,
          new Flight(
            seat.flightId,
            null,
            "",
            "",
            "",
            "",
            "",
            "",
            0,
            null,
            null,
            "",
            "",
            ""
          ),
          localStorage.getItem("userId"),
          seat.deadlineForCanceling,
          seat.rowNumber,
          seat.seatNo,
          ""
        ),
        null,
        "UNCONFIRMED",
        false
      );

      this._reservationService.createReservation(reservation).subscribe();

      this.fastSeats.forEach((fs, index) => {
        if (fs.id == seat.id) {
          this.fastSeats.splice(index, 1);
        }
      });
    });
  }

  countStar(star) {
    let companyRating: CompanyRating = new CompanyRating(
      0,
      localStorage.getItem("userId"),
      this.currentCompany.id,
      +star
    );
    this.ifRated = true;

    this._airlineCompanyService
      .rateAvioCompany(companyRating)
      .subscribe((res) => {});
  }
}

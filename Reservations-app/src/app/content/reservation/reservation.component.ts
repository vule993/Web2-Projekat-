import { Component, OnInit } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";
import { Router } from "@angular/router";
import { Flight } from "src/app/models/Flight.model";
import { FlightsService } from "src/app/services/flights.service";

declare var $: any;

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  flight: Flight;
  suggestedCars: [];
  isFinished: boolean;
  constructor(
    private _flightsService: FlightsService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this._flightsService.getAllFlights().subscribe((data) => {
      let id = +this.routes.url.split("/")[2];
      this.flight = (data as Flight[]).find((flight) => flight.id == id);
    });

    //izbaciti iz this.reservation sve one koji != reservation.airlineReservation.flight.destinations

    $(window).resize(function () {
      let h = +$("#seat-picker").css("height").split("px")[0];

      $("#friends-selector").css({ height: h + "px" });
      $(".friends").css({ height: h - 100 + "px" });
      $("html, body").animate(
        {
          scrollTop: $("#proceed").offset().top,
        },
        1200
      );
    });
  }
  proceed() {
    $("#proceed").slideDown(1200);

    let h = +$("#seat-picker").css("height").split("px")[0];

    $("#friends-selector").css({ height: h + "px" });
    $(".friends").css({ height: h - 100 + "px" });

    $("html, body").animate(
      {
        scrollTop: $("#proceed").offset().top,
      },
      1200
    );
  }
}

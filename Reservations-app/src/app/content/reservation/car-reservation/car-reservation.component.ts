import { Component, OnInit } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation.model";

@Component({
  selector: "app-car-reservation",
  templateUrl: "./car-reservation.component.html",
  styleUrls: ["./car-reservation.component.css"]
})
export class CarReservationComponent implements OnInit {
  reservation: Reservation;

  constructor(
    private reservationService: ReservationService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.allReservations.subscribe(data => {
      let id = +this.routes.url.split("/")[2];
      this.reservation = data.find(reservation => reservation.id == id);
    });
  }
}

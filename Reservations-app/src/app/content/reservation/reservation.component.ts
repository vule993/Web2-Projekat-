import { Component, OnInit } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  reservation: Reservation;

  constructor(
    private reservationService: ReservationService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.allReservations.subscribe((data) => {
      let id = +this.routes.url.split("/")[2];
      this.reservation = data.find((reservation) => reservation.id == id);
      alert(this.reservation.id);
    });
  }
}

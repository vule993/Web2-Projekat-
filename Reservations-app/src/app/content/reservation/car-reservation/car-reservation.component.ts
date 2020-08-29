import { Component, OnInit, Input } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation.model";
import { CarReservation } from "src/app/models/CarReservation";
import { CarOffer } from "src/app/models/carOffer.model";

@Component({
  selector: "app-car-reservation",
  templateUrl: "./car-reservation.component.html",
  styleUrls: ["./car-reservation.component.css"]
})
export class CarReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() carOffers: CarOffer[];
  carReservation: Reservation;

  constructor(
    private reservationService: ReservationService,
    private routes: Router
  ) {}

  /*KADA JE REZERVACIJA NA PROFILU PROMENJENA U FLIGHT*/
  ngOnInit(): void {
    // this.reservationService.allReservations.subscribe((data) => {
    //   let id = +this.routes.url.split("/")[2];
    //   this.carReservation = data.find((reservation) => reservation.id == id);
    // });
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation.model";
import { CarReservation } from "src/app/models/CarReservation";

@Component({
  selector: "app-car-reservation",
  templateUrl: "./car-reservation.component.html",
  styleUrls: ["./car-reservation.component.css"]
})
export class CarReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() suggestedCars: CarReservation[];
  carReservation: Reservation;

  constructor(
    private reservationService: ReservationService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.allReservations.subscribe(data => {
      let id = +this.routes.url.split("/")[2];
      this.carReservation = data.find(reservation => reservation.id == id);
    });
  }

  AddCarReservation(id: string) {
    console.log("id rezervacije: " + id);
    this.reservation.carReservation = this.reservationService.getSpecificReservation(
      +id
    );
    //ovo je finalna rezervacija sa avio + car rezervacijom
  }
}

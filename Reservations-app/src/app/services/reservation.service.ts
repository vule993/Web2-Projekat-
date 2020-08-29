import { Injectable } from "@angular/core";
import { Reservation } from "../models/Reservation.model";
import { AirlineReservation } from "../models/AirlineReservation";
import { Flight } from "../models/Flight.model";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { Destination } from "../models/Destination.model";
import { CarReservation } from "../models/CarReservation";
import { UserModel } from "../models/User.model";
import { Address } from "../models/address.model";
import { BehaviorSubject } from "rxjs";
import { CarsService } from "./cars.service";
import { SeatConfiguration } from "../models/Seat-configuration.model";
import { S_IFDIR } from "constants";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  baseUrl = "http://localhost:5000/api/Reservations/";

  constructor(private _http: HttpClient, private carService: CarsService) {}

  loadAllReservations() {
    return this._http.get(this.baseUrl + "Reservations");
  }
  createReservation(reservation: Reservation) {
    return this._http.put(this.baseUrl + "CreateReservation", reservation);
  }
  // removeReservation(id: number) {
  //   this._allReservations.getValue().forEach((reservation, index) => {
  //     if (reservation.id === id) {
  //       this._allReservations.getValue().splice(index, 1);
  //     }
  //   });
  // }
  // getSpecificReservation(id: number) {
  //   return this.carReservations.find((c) => c.id == id);
  // }
  // getNumberOfReservations() {
  //   return this._allReservations.getValue().length;
  // }

  calculateNumOfDays(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  parseDate(str) {
    var mdy = str.split("-");
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
  }
}

import { Injectable } from "@angular/core";
import { Reservation } from "../models/Reservation.model";
import { CarsService } from "./cars.service";
import { HttpClient } from "@angular/common/http";
import { FlightRating } from "../models/FlightRating.model";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  baseUrl = "http://localhost:5000/api/Reservation/";

  constructor(private _http: HttpClient) {}

  getAllReservations() {
    return this._http.get(this.baseUrl + "GetAllReservations");
  }
  createReservation(reservation: Reservation) {
    return this._http.put(this.baseUrl + "CreateReservation", reservation);
  }
  finishReservation(id: number) {
    return this._http.get(this.baseUrl + "FinishReservation/" + id);
  }
  rateReservation(rating: FlightRating) {
    return this._http.post(this.baseUrl + "RateReservation", rating);
  }
  cancelReservation(reservation: Reservation) {
    return this._http.put(this.baseUrl + "CancelReservation", reservation);
  }
  acceptReservation(id: number) {
    return this._http.get(this.baseUrl + "AcceptReservation/" + id);
  }
  declineReservation(id: number) {
    return this._http.get(this.baseUrl + "DeclineReservation/" + id);
  }

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

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SelectedseatsService {
  private seats = new BehaviorSubject(null);
  selectedSeats = this.seats.asObservable();

  private unSeats = new BehaviorSubject(null);
  unSelectedSeats = this.unSeats.asObservable();

  constructor() {}
  setSelectedSeats(seats) {
    this.seats.next(seats);
  }
  setUnSelectedSeats(unselectedSeats) {
    this.unSeats.next(unselectedSeats);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SelectedseatsService {
  private seats = new BehaviorSubject(null);
  selectedSeats = this.seats.asObservable();
  constructor() {}
  setSelectedSeats(seats) {
    this.seats.next(seats);
  }
}

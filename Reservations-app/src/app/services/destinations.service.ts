import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Destination } from "../models/Destination.model";
import { ɵBrowserGetTestability } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class DestinationsService {
  private _allDestinations = new BehaviorSubject<Destination[]>([
    new Destination(1, "Nikola Tesla", "Belgrade", "Serbia", "Nikole Tesle bb"),
    new Destination(2, "Heathrow", "London", "UK", "Some street 1"),
  ]);
  allDestinations = this._allDestinations.asObservable();
  constructor() {}

  addDestination(newDestination: Destination) {
    let destinations = this._allDestinations.getValue();
    destinations.push(newDestination);
    this._allDestinations.next(destinations);
  }
  removeDestination(id: number) {
    let destinations = this._allDestinations.getValue();
    destinations.forEach((destination, index) => {
      if (destination.id === id) {
        destinations.splice(index, 1);
      }
    });
    this._allDestinations.next(destinations);
  }
  loadAllDestinations() {
    return this.allDestinations;
  }
}

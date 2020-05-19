import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SeatConfiguration } from "../models/Seat-configuration.model";

@Injectable({
  providedIn: "root",
})
export class SeatsConfigService {
  private _dataArray = new BehaviorSubject<
    [number, number, number, number, number, number]
  >([0, 0, 0, 0, 0, 0]);

  currentData = this._dataArray.asObservable();
  AllSeatConfigurations: SeatConfiguration[];
  constructor() {}

  changeData(newData) {
    this._dataArray.next(newData);
  }

  //dodato
  allSeatConfigurations() {
    this.AllSeatConfigurations = [
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 0, 0),
      new SeatConfiguration("Concord", 8, 3, 2, 3, 2, 0),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 0, 0),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 7, 0),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 0, 7),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 5, 0),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 11, 0),
      new SeatConfiguration("Boeing 747", 10, 2, 2, 2, 0, 11),
    ];
    return this.AllSeatConfigurations;
  }

  loadAllSeatConfigurations() {
    return this.allSeatConfigurations();
  }

  addSeatConfig(seatConfiguration: SeatConfiguration) {
    this.allSeatConfigurations().push(seatConfiguration);
  }

  getSeatConfigurationNumber() {
    return this.AllSeatConfigurations.length;
  }
}

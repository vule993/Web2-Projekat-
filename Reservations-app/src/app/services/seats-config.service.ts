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
  constructor() {
    this.AllSeatConfigurations = [
      new SeatConfiguration(1, "Boeing 747", 10, 2, 2, 2, 0, 0),
      new SeatConfiguration(2, "Concord", 8, 3, 2, 3, 2, 0),
      new SeatConfiguration(3, "Boeing 747", 10, 2, 2, 2, 0, 0),
      new SeatConfiguration(4, "Boeing 747", 10, 2, 2, 2, 7, 0),
      new SeatConfiguration(5, "Boeing 747", 10, 2, 2, 2, 0, 7),
      new SeatConfiguration(6, "Boeing 747", 10, 2, 2, 2, 5, 0),
      new SeatConfiguration(7, "Boeing 747", 10, 2, 2, 2, 11, 0),
      new SeatConfiguration(8, "Boeing 747", 10, 2, 2, 2, 0, 11),
    ];
  }

  changeData(newData) {
    this._dataArray.next(newData);
  }

  loadAllSeatConfigurations() {
    return this.AllSeatConfigurations;
  }

  addSeatConfig(seatConfiguration: SeatConfiguration) {
    this.AllSeatConfigurations.push(seatConfiguration);
  }

  getSeatConfigurationNumber() {
    return this.AllSeatConfigurations.length;
  }
}

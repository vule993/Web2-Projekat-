import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SeatConfiguration } from "../models/Seat-configuration.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SeatsConfigService {
  readonly baseURL = "http://localhost:5000/api/Airlines/";

  private _dataArray = new BehaviorSubject<
    [number, number, number, number, number, number]
  >([0, 0, 0, 0, 0, 0]);

  currentData = this._dataArray.asObservable();

  constructor(private _httpClient: HttpClient) {}

  //???   ovo je nesto vezano za slajder al treba provaliti sta sam uradio
  changeData(newData) {
    this._dataArray.next(newData);
  }

  getAllSeatConfigurations() {
    return this._httpClient.get(this.baseURL + "GetAllSeatConfigurations");
  }

  createSeatConfiguration(seatConfiguration: SeatConfiguration) {
    return this._httpClient.put(
      this.baseURL + "CreateSeatConfiguration",
      seatConfiguration
    );
  }

  getSeatConfigurationNumber() {
    //return this.AllSeatConfigurations.length;
    return 0;
  }

  updateSeat(seat) {
    return this._httpClient.put(this.baseURL + "UpdateSeat", seat);
  }
}

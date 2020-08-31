import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Flight } from "../models/Flight.model";

@Injectable({
  providedIn: "root",
})
export class FlightsService {
  readonly baseURL = "http://localhost:5000/api/Airlines/";
  constructor(private _httpClient: HttpClient) {}

  createFlight(flight: Flight) {
    return this._httpClient.put(this.baseURL + "CreateFlight", flight);
  }

  getFlight(id: number) {
    return this._httpClient.get(this.baseURL + "GetFlight/" + id);
  }
  getAllFlights() {
    return this._httpClient.get(this.baseURL + "GetAllFlights");
  }

  deleteFlight(id: number) {
    this._httpClient.delete(this.baseURL + "DeleteFlight/" + id);
  }
}

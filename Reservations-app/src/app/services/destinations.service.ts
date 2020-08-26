import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Destination } from "../models/Destination.model";
import { ɵBrowserGetTestability } from "@angular/platform-browser";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JsonPipe } from "@angular/common";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AvailableDestination } from "../models/AvailableDestination.model";

@Injectable({
  providedIn: "root",
})
export class DestinationsService {
  readonly baseURL = "http://localhost:5000/api";
  constructor(private httpClient: HttpClient) {}

  //Destinations
  create(company: AirlineCompany, newDestination: Destination) {
    return this.httpClient.post(this.baseURL + "/Airlines/AddDestinations", {
      Company: company,
      Destination: newDestination,
    });
  }

  delete(id: string) {
    return this.httpClient.delete(
      this.baseURL + "/Airlines/DeleteDestination/" + id
    );
  }
  getAll() {
    return this.httpClient.get(this.baseURL + "/Airlines/Destinations");
  }

  //AvailableDestinations
  createAvailableDestination(
    company: AirlineCompany,
    newDestination: AvailableDestination
  ) {
    return this.httpClient.post(
      this.baseURL + "/Airlines/AddAvailableDestination",
      {
        Company: company,
        Destination: newDestination,
      }
    );
  }

  deleteAvailableDestination(id: string) {
    return this.httpClient.delete(
      this.baseURL + "/Airlines/DeleteAvailableDestination/" + id
    );
  }
  getAllAvailableDestinations() {
    return this.httpClient.get(
      this.baseURL + "/Airlines/AvailableDestinations"
    );
  }
}

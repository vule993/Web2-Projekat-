import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Destination } from "../models/Destination.model";
import { ɵBrowserGetTestability } from "@angular/platform-browser";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JsonPipe } from "@angular/common";
import { AvioCompany } from "../models/AvioCompany.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: "root",
})
export class DestinationsService {
  readonly baseURL = "http://localhost:5000/api";
  constructor(private httpClient: HttpClient) {}

  create(company: AvioCompany, newDestination: Destination) {
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
}

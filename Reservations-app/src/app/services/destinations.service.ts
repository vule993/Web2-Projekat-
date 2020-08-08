import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Destination } from "../models/Destination.model";
import { ɵBrowserGetTestability } from "@angular/platform-browser";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { JsonPipe } from "@angular/common";
import { AvioCompany } from "../models/AvioCompany.model";

@Injectable({
  providedIn: "root",
})
export class DestinationsService {
  readonly baseURL = "http://localhost:5000/api";

  private _allDestinations = new BehaviorSubject<Destination[]>([
    new Destination(1, "Nikola Tesla", "Belgrade", "Serbia", "Nikole Tesle bb"),
    new Destination(2, "Heathrow", "London", "UK", "Some street 1"),
  ]);
  allDestinations = this._allDestinations.asObservable();
  constructor(private httpClient: HttpClient) {}

  addDestination(company: AvioCompany, newDestination: Destination) {
    return this.httpClient.post(this.baseURL + "/Airlines/AddDestinations", {
      Company: company,
      Destination: newDestination,
      // companyId: 1,
      // destination: {
      //   id: 1,
      //   airportName: "cao",
      //   city: "cao",
      //   country: "cao",
      //   address: "cao",
      // },
    });
    // let destinations = this._allDestinations.getValue();
    // destinations.push(newDestination);
    // this._allDestinations.next(destinations);
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

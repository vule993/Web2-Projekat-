import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { Address } from "../models/address.model";
import { Destination } from "../models/Destination.model";
import { UserModel } from "../models/User.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AviocompaniesService {
  readonly baseURL = "http://localhost:5000/api/";
  constructor(private httpClient: HttpClient) {}

  addAvioCompany(company: AirlineCompany) {}
  removeAvioCompany(companyId: number) {}

  getCompany(id: string = "1") {
    return this.httpClient.get(this.baseURL + "Airlines/GetCompany/" + id);
  }
  getAllCompanies() {
    return this.httpClient.get(this.baseURL + "Airlines/GetAllCompanies");
  }
}

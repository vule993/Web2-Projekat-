import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { Address } from "../models/address.model";
import { Destination } from "../models/Destination.model";
import { UserModel } from "../models/User.model";
import { HttpClient } from "@angular/common/http";
import { CompanyRating } from "../models/CompanyRating.model";

@Injectable({
  providedIn: "root",
})
export class AviocompaniesService {
  readonly baseURL = "http://localhost:5000/api/";
  constructor(private httpClient: HttpClient) {}

  updateCompany(avioCompany: AirlineCompany) {
    return this.httpClient.put(
      this.baseURL + "Airlines/UpdateCompanyInfo",
      avioCompany
    );
  }
  getCompany(email: string) {
    return this.httpClient.get(this.baseURL + "Airlines/GetCompany/" + email);
  }
  getAllCompanies() {
    return this.httpClient.get(this.baseURL + "Airlines/GetAllCompanies");
  }

  deleteAvioCompany(id: number) {
    return this.httpClient.delete(this.baseURL + "Airlines/Delete/" + id);
  }
  getCompanyById(id: string) {
    return this.httpClient.get(this.baseURL + "Airlines/GetCompanyById/" + id);
  }
  rateAvioCompany(rate: CompanyRating) {
    return this.httpClient.post(this.baseURL + "Airlines/RateCompany", rate);
  }
  getAllCompanyRatings(companyId: number) {
    return this.httpClient.get(
      this.baseURL + "Airlines/GetAllCompanyRatings/" + companyId
    );
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormModel } from "../models/formModel";
import { UserModel } from "../models/User.model";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { CarCompany } from "../models/CarCompany.model";
import { Car } from "../models/car.model";
import { AirlineCompanyProfileComponent } from "../content/companies/airlines/airline-company-profile/airline-company-profile.component";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  readonly baseURL = "http://localhost:5000/api";

  constructor(private httpClient: HttpClient) {}

  registerCarAdmin(admin: UserModel) {
    return this.httpClient.post(
      this.baseURL + "/Admin/RegisterCarAdmin",
      admin
    );
  }

  registerAvioAdmin(admin: UserModel) {
    return this.httpClient.post(
      this.baseURL + "/Admin/RegisterAvioAdmin",
      admin
    );
  }

  createAvioCompany(company: AirlineCompany) {
    return this.httpClient.post(
      this.baseURL + "/Admin/CreateAirlineCompany",
      company
    );
  }

  createCarCompany(company: CarCompany) {
    return this.httpClient.post(
      this.baseURL + "/Admin/CreateCarCompany",
      company
    );
  }

  changeAdminDetails(admin: FormModel) {
    return this.httpClient.put(this.baseURL + "/Admin/ChangeDetails", admin);
  }

  getCarsOfCompany(companyId: number) {
    return this.httpClient.get<Car[]>(
      this.baseURL + "/Car/GetCarsOfCompany/" + companyId
    );
  }

  addCarToCompany(car: Car, companyId: number) {
    return this.httpClient.post(this.baseURL + "/Car", { car, companyId });
  }

  getAdminCarCompany(admin: string) {
    return this.httpClient.get(
      this.baseURL + "/CarCompany/GetCompanyByEmail/" + admin
    );
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormModel } from "../models/formModel";
import { UserModel } from "../models/User.model";
import { AvioCompany } from "../models/AirlineCompany.model";
import { CarCompany } from "../models/CarCompany.model";
import { Car } from "../models/car.model";

@Injectable({
  providedIn: "root",
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

  createAvioCompany(company: AvioCompany) {
    return this.httpClient.post(
      this.baseURL + "/Admin/CreateAvioCompany",
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

  getCarsOfCompany(company: string) {}

  addCarToCompany(carId: number, companyId: number) {
    return this.httpClient.post<Car>(
      this.baseURL + "/CarCompany/AddCarToCompany",
      { carId: carId, companyId: companyId }
    );
  }
}

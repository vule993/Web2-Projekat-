import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormModel } from "../models/formModel";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  readonly baseURL = "http://localhost:5000/api";

  constructor(private httpClient: HttpClient) {}

  registerCarAdmin(admin: FormModel) {
    return this.httpClient.post(
      this.baseURL + "/Admin/RegisterCarAdmin",
      admin
    );
  }

  registerAvioAdmin(admin: FormModel) {
    return this.httpClient.post(
      this.baseURL + "/Admin/RegisterAvioAdmin",
      admin
    );
  }

  changeAdminDetails(admin: FormModel) {
    return this.httpClient.put(this.baseURL + "/Admin/ChangeDetails", admin);
  }
}

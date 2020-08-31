import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { environment } from "src/environments/environment";
import { Discount } from "../models/Discount.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DiscountService {
  baseURL = environment.serverAddress + "/api/Airlines/";
  constructor(private _http: HttpClient) {}

  createDiscount(d: Discount) {
    return this._http.put(this.baseURL + "CreateDiscount", d);
  }
  getDiscount(d: string) {
    return this._http.get(this.baseURL + "GetDiscount/" + d);
  }
  getAllDiscounts() {
    return this._http.get(this.baseURL + "GetAllDiscounts");
  }
  deleteDiscount(d: number) {
    return this._http.get(this.baseURL + "DeleteDiscount/" + d);
  }
}

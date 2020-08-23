import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PlaneService } from "../models/PlaneService.model";

@Injectable({
  providedIn: "root",
})
export class PlaneServicesService {
  readonly baseURL = "http://localhost:5000/api/Airlines/";
  constructor(private _http: HttpClient) {}
  createService(service: PlaneService) {
    return this._http.put(this.baseURL + "CreateService", service);
  }
  getAllServices() {
    return this._http.get(this.baseURL + "GetAllServices");
  }
  deleteService(id: number) {
    return this._http.delete(this.baseURL + "DeleteService/" + id);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PlaneType } from "../models/PlaneType.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PlaneTypeService {
  baseURL = "http://localhost:5000/api/Airlines/";

  private _dataArray = new BehaviorSubject<
    [number, number, number, number, number, number]
  >([0, 0, 0, 0, 0, 0]);

  currentData = this._dataArray.asObservable();
  constructor(private _http: HttpClient) {}

  getPlaneTypeSeatsNumber() {
    return 0;
  }
  getAllPlaneTypes() {
    return this._http.get(this.baseURL + "GetAllPlaneTypes");
  }
  getPlaneType(id: string) {
    return this._http.get(this.baseURL + "GetPlaneType/" + id);
  }
  createPlaneType(planeType: PlaneType) {
    return this._http.put(this.baseURL + "CreatePlaneType", planeType);
  }

  changeData(newData) {
    this._dataArray.next(newData);
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: "root",
})
export class SeatsConfigService {
  private _dataArray = new BehaviorSubject<
    [number, number, number, number, number, number]
  >([0, 0, 0, 0, 0, 0]);

  currentData = this._dataArray.asObservable();

  constructor() {}

  changeData(newData) {
    this._dataArray.next(newData);
  }
}

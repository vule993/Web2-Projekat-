import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SelectedcompanyService {
  private data = new BehaviorSubject("");
  currentCompany = this.data.asObservable();

  constructor() {}

  setData(data) {
    this.data.next(data);
  }
}

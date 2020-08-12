import { Injectable } from "@angular/core";
import { CarCompany } from "../models/CarCompany.model";
import { Car } from "../models/car.model";

import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CarsService {
  readonly baseURL = "http://localhost:5000/api";

  private cars: Car[] = [
    new Car(
      0,
      "brand new ferary",
      "Ferari",
      2020,
      2,
      350000,
      5,
      "https://www.automagazin.rs/slike/vesti/20190530080049_photo_1.jpg",
      "pro",
      false
    ),
    new Car(
      1,
      "brand new BMW",
      "BMW",
      2020,
      5,
      170000,
      5,
      "https://www.cstatic-images.com/car-pictures/xl/usd00bmc931a021001.png",
      "pro",
      false
    ),
    new Car(
      2,
      "super cool Mercedes",
      "Mercedes",
      2019,
      5,
      120000,
      4.8,
      "https://www.luxlife.rs/storage/posts/thumbnail/2018/Nov/2514/najskuplji-2019-mercedes-cls-kosta-115905-dolara.jpg",
      "plus",
      true
    ),
    new Car(
      3,
      "fast car",
      "BMW i8",
      2019,
      2,
      140000,
      4.8,
      "https://images3.polovniautomobili.tv/user-images/thumbs/1618/16180464/28354d9abf05-800x600.jpg",
      "pro",
      false
    ),
    new Car(
      4,
      "family car",
      "WW",
      2018,
      6,
      10000,
      4.2,
      "https://secureservercdn.net/198.71.233.161/f0a.34d.myftpupload.com/wp-content/uploads/2018/11/ww-tiguan-696x469.jpg",
      "plus",
      false
    ),
    new Car(
      5,
      "polo",
      "WW",
      2002,
      5,
      3500,
      3.5,
      "https://images3.polovniautomobili.tv/user-images/thumbs/1574/15745318/6d98cfab9f51-800x600.jpg",
      "basic",
      false
    )
  ];

  private _allCarCompanies = new BehaviorSubject<CarCompany[]>([]);

  public allCarCompanies = this._allCarCompanies.asObservable();

  constructor(private httpClient: HttpClient) {}

  /***** METHODS *****/

  getCarCompanies() {
    return this.httpClient.get(this.baseURL + "/CarCompany/GetAll");
  }

  getCarCompany(index: number) {
    return this._allCarCompanies
      .getValue()
      .find(carCompany => carCompany.id === index);
  }

  getCars = () => {
    return this.cars;
  };

  getCar = index => {
    return this.cars[index];
  };

  getPrice(plan: string, numOfDays: number) {
    switch (plan) {
      case "pro":
        return 49 * numOfDays;
        break;
      case "plus":
        return 30 * numOfDays;
        break;
      case "basic":
        return 20 * numOfDays;
        break;
      default:
        console.log("wrong input");
    }
  }
  //connection to api

  addCar(car: Car) {
    return this.httpClient.post(this.baseURL + "Car", car);
  }
}

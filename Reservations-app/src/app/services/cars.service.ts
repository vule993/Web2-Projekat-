import { Injectable } from "@angular/core";
import { CarCompany } from "../models/CarCompany.model";
import { Car } from "../models/car.model";

@Injectable({
  providedIn: "root"
})
export class CarsService {
  private cars: Car[] = [
    new Car(
      "brand new ferary",
      "Ferari",
      2020,
      2,
      350000,
      5,
      "https://www.automagazin.rs/slike/vesti/20190530080049_photo_1.jpg"
    ),
    new Car(
      "brand new BMW",
      "BMW",
      2020,
      5,
      170000,
      5,
      "https://www.cstatic-images.com/car-pictures/xl/usd00bmc931a021001.png"
    ),
    new Car(
      "super cool Mercedes",
      "Mercedes",
      2019,
      5,
      120000,
      4.8,
      "https://www.luxlife.rs/storage/posts/thumbnail/2018/Nov/2514/najskuplji-2019-mercedes-cls-kosta-115905-dolara.jpg"
    ),
    new Car(
      "fast car",
      "BMW i8",
      2019,
      2,
      140000,
      4.8,
      "https://images3.polovniautomobili.tv/user-images/thumbs/1618/16180464/28354d9abf05-800x600.jpg"
    ),
    new Car(
      "family car",
      "WW",
      2018,
      6,
      10000,
      4.2,
      "https://secureservercdn.net/198.71.233.161/f0a.34d.myftpupload.com/wp-content/uploads/2018/11/ww-tiguan-696x469.jpg"
    ),
    new Car(
      "polo",
      "WW",
      2002,
      5,
      3500,
      3.5,
      "https://images3.polovniautomobili.tv/user-images/thumbs/1574/15745318/6d98cfab9f51-800x600.jpg"
    )
  ];

  private carCompanies: CarCompany[] = [
    new CarCompany(
      "Ime kompanije",
      3.5,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://www.rentalcariran.com/wp-content/uploads/2018/10/logo-min-1.png",
      this.cars.slice(0, 4)
    ),
    new CarCompany(
      "Ime kompanije 2",
      4.5,
      "kompanija za rent a car smestena u beogradu bla bla bla",
      "neka adresa",
      "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://www.rentalcariran.com/wp-content/uploads/2018/10/logo-min-1.png",
      this.cars.slice(3, 5)
    ),
    new CarCompany(
      "Ime kompanije 3",
      4.8,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6Rzl1IwbXk_9asH2mIJLHU_2eRkkCX2yQELPUvLNlk9ldx_-E&usqp=CAU",
      this.cars.slice(1, 5)
    ),
    new CarCompany(
      "Ime kompanije 4",
      4.2,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6Rzl1IwbXk_9asH2mIJLHU_2eRkkCX2yQELPUvLNlk9ldx_-E&usqp=CAU",
      this.cars.slice(0, 4).reverse()
    )
  ];

  constructor() {}

  /***** METHODS *****/

  getCarCompanies = () => {
    return this.carCompanies;
  };

  getCarCompany(index: number) {
    return this.carCompanies[index];
  }

  getCars = () => {
    return this.cars;
  };

  getCar = index => {
    return this.cars[index];
  };
}

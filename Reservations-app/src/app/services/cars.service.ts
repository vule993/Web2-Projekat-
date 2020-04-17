import { Injectable } from "@angular/core";
import { CarCompany } from "../models/CarCompany.model";

@Injectable({
  providedIn: "root"
})
export class CarsService {
  private carCompanies: CarCompany[] = [
    new CarCompany(
      "Ime kompanije",
      3.5,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://www.rentalcariran.com/wp-content/uploads/2018/10/logo-min-1.png"
    ),
    new CarCompany(
      "Ime kompanije 2",
      4.5,
      "kompanija za rent a car smestena u beogradu bla bla bla",
      "neka adresa",
      "https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://www.rentalcariran.com/wp-content/uploads/2018/10/logo-min-1.png"
    ),
    new CarCompany(
      "Ime kompanije 3",
      4.8,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6Rzl1IwbXk_9asH2mIJLHU_2eRkkCX2yQELPUvLNlk9ldx_-E&usqp=CAU"
    ),
    new CarCompany(
      "Ime kompanije 4",
      4.2,
      "kompanija za rent a car smestena u indiji bla bla bla",
      "India",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6Rzl1IwbXk_9asH2mIJLHU_2eRkkCX2yQELPUvLNlk9ldx_-E&usqp=CAU"
    )
  ];

  constructor() {}

  /***** METHODS *****/

  getCarCompanies = () => {
    return this.carCompanies;
  };
}

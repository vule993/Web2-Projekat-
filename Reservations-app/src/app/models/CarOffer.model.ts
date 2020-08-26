import { Car } from "./car.model";
import { CarCompany } from "./CarCompany.model";

export class CarOffer {
  constructor(
    public description: string,
    public car: Car,
    public carCompany: CarCompany,
    public id?: number
  ) {}
}

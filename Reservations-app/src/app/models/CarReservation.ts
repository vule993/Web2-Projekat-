import { Car } from "./car.model";
import { CarCompany } from "./CarCompany.model";

export class CarReservation {
  constructor(
    public id: number,
    public car: Car,
    public carCompany: CarCompany,
    public startDate: string,
    public endDate: string,
    public price: number
  ) {}
}

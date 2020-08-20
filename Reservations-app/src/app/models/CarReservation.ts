import { Car } from "./car.model";
import { CarCompany } from "./CarCompany.model";

export class CarReservation {
  constructor(
    public car: Car,
    public carCompany: CarCompany,
    public startDate: string,
    public endDate: string,
    public carId: number,
    public fullPrice: number,
    public userEmail?: string,
    public id?: number
  ) {}
}

/*
Ovako ce izgledati CarReservation:
    ublic id: number,
    public reservedCarId: number,
    public startDate: string,
    public endDate: string,
    public price: number,
    public userEmail: string

*/

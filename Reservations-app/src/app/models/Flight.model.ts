import { Destination } from "./Destination.model";
import { AirlineCompany } from "./AirlineCompany.model";
import { SeatConfiguration } from "./Seat-configuration.model";

export class Flight {
  constructor(
    public id: number,
    public avioCompany: AirlineCompany,
    public startDate: string,
    public arrivingDate: string,
    public startTime: string,
    public arrivingTime: string,
    public distance: string,
    public estimationTime: string,
    public discount: number, //ovo sam menjao tip iz string -> number
    public seatConfiguration: SeatConfiguration,
    public destinations: Destination[],
    public otherServices: string,
    public price: string,
    public luggage: string,
    public rateNo: number = 0,
    public rateSum: number = 0,
    public rating: number = 0
  ) {}
}

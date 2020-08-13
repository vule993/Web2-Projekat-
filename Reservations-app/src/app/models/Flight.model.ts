import { Destination } from "./Destination.model";
import { AirlineCompany } from "./AirlineCompany.model";
import { SeatConfiguration } from "./Seat-configuration.model";

export class Flight {
  constructor(
    public id: number,
    public company: AirlineCompany,
    public startingDestination: Destination,
    public endingDestination: Destination,
    public startDate: string,
    public returnDate: string,
    public startTime: string,
    public endTime: string,
    public distance: string,
    public estimationTime: string,
    public discount: number, //ovo sam menjao tip iz string -> number
    public planeType: SeatConfiguration,
    public destinations: Destination[],
    public otherServices: string,
    public price: string,
    public luggage: string
  ) {}
}

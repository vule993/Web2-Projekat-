import { AirlineReservation } from "./AirlineReservation";
import { CarReservation } from "./CarReservation";

export class Reservation {
  constructor(
    public id: number,
    public airlineReservation: AirlineReservation,
    public carReservation: CarReservation,
    public status: string = "UNCONFIRMED",
    public isFinished: boolean = false
  ) {}
}

import { AirlineReservation } from "./AirlineReservation";
import { CarReservation } from "./CarReservation";

export class Reservation {
  constructor(
    public id: number,
    public airlineReservation: AirlineReservation,
    public carReservation: CarReservation,
    public taken: boolean = false,
    public isFinished: boolean = false
  ) {}
}

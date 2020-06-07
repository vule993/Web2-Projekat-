import { Flight } from "./Flight.model";
import { User } from "./User.model";

export class AirlineReservation {
  constructor(public id: number, public flight: Flight, passengers: User[]) {}
}

import { Flight } from "./Flight.model";
import { UserModel } from "./User.model";

export class AirlineReservation {
  constructor(public id: number, public flight: Flight) {}
}

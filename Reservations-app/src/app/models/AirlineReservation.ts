import { Flight } from "./Flight.model";
import { UserModel } from "./User.model";
import { Passenger } from "./Passenger.model";

export class AirlineReservation {
  constructor(
    public id: number,
    public flight: Flight,
    public passenger: Passenger,
    public deadlineForCanceling: string,
    public rowNumber: number,
    public seatNumber: number
  ) {}
}

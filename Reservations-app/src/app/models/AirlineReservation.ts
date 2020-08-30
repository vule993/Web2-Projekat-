import { Flight } from "./Flight.model";
import { UserModel } from "./User.model";

export class AirlineReservation {
  constructor(
    public id: number,
    public flight: Flight,
    public passenger: UserModel,
    public deadlineForCanceling: string,
    public rowNumber: number,
    public seatNumber: number,
    public confirmDate: string = "",
    public rating: number = 0
  ) {}
}

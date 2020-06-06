import { User } from "./User.model";

export class Passenger {
  constructor(
    public id: number,
    public user: User,
    public approvedAirlineSeat: boolean,
    public approvedCarSeat: boolean
  ) {}
}

import { UserModel } from "./User.model";

export class Passenger {
  constructor(
    public user: UserModel,
    public id: number = 0,
    public approvedAirlineSeat: boolean = false,
    public approvedCarSeat: boolean = false
  ) {}
}

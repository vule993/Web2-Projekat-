import { UserModel } from "./User.model";

export class Passenger {
  constructor(
    public id: number,
    public user: UserModel,
    public approvedAirlineSeat: boolean,
    public approvedCarSeat: boolean
  ) {}
}

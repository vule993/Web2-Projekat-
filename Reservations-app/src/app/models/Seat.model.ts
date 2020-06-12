import { UserModel } from "./User.model";

export class Seat {
  public taken = false;
  public user: UserModel = null;
  public seatReservationConfirmed: boolean = false;
  constructor(public seat_no: number = -1) {}
}

export class Row {
  seats: Seat[] = [];
  constructor() {}
}

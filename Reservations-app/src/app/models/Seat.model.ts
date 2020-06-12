import { UserModel } from "./User.model";
import { Passenger } from "./Passenger.model";

export class Seat {
  public id: number;
  public taken = false;
  public passenger: Passenger = null;
  public seatReservationConfirmed: boolean = false;
  constructor(public seatNo: number = -1) {}
}

export class Row {
  id: number;
  seats: Seat[] = [];
  constructor() {}
}

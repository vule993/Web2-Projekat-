import { User } from "./User.model";

export class Seat {
  static count: number = 0;
  public taken = false;
  public user: User = null;
  constructor(
    public seat_no: number = -1,
    public id: number = ++Seat.count,
    public seatReservationConfirmed: boolean = false
  ) {}
}

export class Row {
  seats: Seat[] = [];
  constructor() {}
}

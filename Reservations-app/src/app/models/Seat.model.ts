import { UserModel } from "./User.model";

export class Seat {
  constructor(
    public id: number,
    public forFastReservation: boolean,
    public seatStatus: string /*  "FREE" or "TAKEN" or "CONFIRMED"  */,
    public passenger: UserModel, //?????
    public seatNo: number = -1
  ) {}
}

export class Row {
  id: number;
  rowNo: number;
  seats: Seat[] = [];
  constructor() {}
}

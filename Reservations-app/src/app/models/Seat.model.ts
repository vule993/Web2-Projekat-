export class Seat {
  taken = false;
  constructor(public seat_no: number = -1) {}
}

export class Row {
  seats: Seat[] = [];
  constructor() {}
}

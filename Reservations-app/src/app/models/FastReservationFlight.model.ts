import { Destination } from "./Destination.model";

export class FastReservationFlight {
  constructor(
    public id: number,
    public startDestination: Destination,
    public endDestination: Destination,
    public dateAndTime: string,
    public seatNo: number,
    public price: string,
    public discount: number,
    public userEmail?: string
  ) {}
}

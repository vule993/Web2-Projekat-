import { Destination } from "./Destination.model";
import { Flight } from "./Flight.model";

export class FastReservationFlight {
  constructor(
    public id: number,
    public startDestination: Destination,
    public endDestination: Destination,
    public dateAndTime: string,
    public price: string,
    public discount: number,
    public flightId: number,
    public seatMark: string,
    public seatNo: number,
    public rowNumber: number,
    public deadlineForCanceling,
    public userEmail?: string
  ) {}
}

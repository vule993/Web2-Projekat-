import { Address } from "./address.model";
import { Destination } from "./Destination.model";
import { SeatConfiguration } from "./Seat-configuration.model";
import { Flight } from "./Flight.model";
import { ReservationComponent } from "../content/reservation/reservation.component";
import { Reservation } from "./Reservation.model";
import { UserModel } from "./User.model";

export class AirlineCompany {
  constructor(
    public id: number,
    public name: string,
    public address: Address,
    public description: string,
    public destinations: Destination[],
    public flights: Reservation[],
    //public discounts: string[],
    public seatConfigurations: SeatConfiguration[],
    public likes: number,
    public admin: UserModel
  ) {}
}

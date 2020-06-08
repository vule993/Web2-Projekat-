import { Address } from "./address.model";
import { Destination } from "./Destination.model";
import { SeatConfiguration } from "./Seat-configuration.model";
import { Flight } from "./Flight.model";
import { ReservationComponent } from "../content/reservation/reservation.component";
import { Reservation } from "./Reservation.model";

export class AvioCompany {
  constructor(
    public name: string,
    public address: Address,
    public description: string,
    public destinations: Destination[],
    public flights: Reservation[],
    public discounts: string[],
    public seatConfigurations: SeatConfiguration[],
    public likes: number,
    public id: number
  ) {}
  getName() {
    return this.name;
  }
  getAddress() {
    return this.address.getFullAddress();
  }
  getDescription() {
    return this.description;
  }
  getLikes() {
    return this.likes;
  }
  getId() {
    return this.id;
  }
}
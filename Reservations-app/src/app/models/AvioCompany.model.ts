import { Address } from "./address.model";
import { Destination } from "./Destination.model";
import { SeatConfiguration } from "./Seat-configuration.model";
import { Flight } from "./Flight";

export class AvioCompany {
  constructor(
    private name: string,
    private address: Address,
    private description: string,
    private destinations: Destination[],
    private flights: Flight[],
    private discounts: string[],
    private seatConfigurations: SeatConfiguration[],
    private likes: number,
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

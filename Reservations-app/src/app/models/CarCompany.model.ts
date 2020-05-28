import { Car } from "./car.model";

export class CarCompany {
  constructor(
    public id: number,
    public name: string,
    public rating: number, //prosecna ocena
    public description: string,
    public address: string, //zemlja
    public city: string,
    public thumbnail: string,
    public cars: Car[]
  ) {}

  //helpers:

  getName() {
    return this.name;
  }
  getAddress() {
    return this.city + " " + this.address;
  }
  getDescription() {
    return this.description;
  }
  getRating() {
    return this.rating;
  }
  getId() {
    return this.id;
  }
}

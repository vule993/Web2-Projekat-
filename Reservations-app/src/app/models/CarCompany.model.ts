import { Car } from "./car.model";

export class CarCompany {
  constructor(
    public name: string,
    public rating: number, //prosecna ocena
    public description: string,
    public address: string, //zemlja
    public city: string,
    public thumbnail: string,
    public cars: Car[]
  ) {}
}

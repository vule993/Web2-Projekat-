import { Car } from "./car.model";
import { UserModel } from "./User.model";

export class CarCompany {
  constructor(
    public id: number,
    public name: string,
    public rating: number, //prosecna ocena
    public description: string,
    public address: string, //zemlja
    public city: string,
    public thumbnail: string,
    public cars: Car[],
    public admin: string = null,
    public lat: number = 0,
    public lon: number = 0
  ) {}
}

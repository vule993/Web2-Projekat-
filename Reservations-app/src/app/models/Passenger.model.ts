import { UserModel } from "./User.model";

export class Passenger {
  constructor(
    public id: number,
    public userEmail: string,
    public firstName: string,
    public lastName: string,
    public passportNumber: string
  ) {}
}

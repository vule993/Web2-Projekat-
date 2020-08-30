import { Reservation } from "./Reservation.model";
import { Friend } from "./Friend.model";

export class UserModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public image: string,
    public city: string,
    public street: string,
    public phoneNumber: string,
    public status: string, //1->head admin 2->car-admin 3->avio-admin 4->user
    public friends: Friend[] = [],
    public reservations: Reservation[] = [],
    public id?: number,
    public Id?: string,
    public passportNo?: string
  ) {}
}

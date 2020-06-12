import { UserModel } from "./User.model";

export class Notification {
  constructor(
    public id: Number,
    public userToNotify: UserModel,
    public userThatNotifies: UserModel,
    public status: number = 0 //0 not opened, 1 opened
  ) {}
}

import { User } from "./User.model";

export class Notification {
  constructor(
    public id: Number,
    public userToNotify: User,
    public userThatNotifies: User,
    public status: number = 0 //0 not opened, 1 opened
  ) {}
}

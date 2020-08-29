import { UserModel } from "./User.model";
import { FormModel } from "./formModel";

export class InviteFriend {
  constructor(public user: FormModel, public initiatorsEmail: string) {}
}

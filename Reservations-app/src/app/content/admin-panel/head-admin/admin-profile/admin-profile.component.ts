import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: [
    "./admin-profile.component.css",
    "../../../profile/edit-profile/edit-profile.component.css"
  ]
})
export class AdminProfileComponent implements OnInit {
  public currentUser = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    street: "",
    city: "",
    phoneNumber: "",
    password: ""
  };

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    // this.userService
    //   .getUserProfile()
    //   .subscribe((profile: any) => (this.currentUser = profile));
  }
}

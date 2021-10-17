import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";
import { parseHostBindings } from "@angular/compiler";
declare var $: any;
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent implements OnInit {
  currentUser: UserModel;
  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this._userService.getUserProfile().subscribe((user) => {
      debugger
      this.currentUser = <UserModel>user;
    });
  }

  updateUser() {
    let firstName = $("#name").val();
    let lastName = $("#surname").val();
    let email = $("#mail").val();
    let street = $("#street").val();
    let city = $("#city").val();
    let phoneNumber = $("#phone").val();
    let passportNo = $("#passport").val();
    let pass1 = $("#pass1").val();
    let pass2 = $("#pass2").val();
    console.log("radii");
    console.log("mail" + email);
    debugger;
    if (pass1 !== pass2) {
      alert("Passwords must be identical!");

      return;
    }

    if (localStorage.getItem("token") == undefined) {
      alert("You are not logged in!");
    }

    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    this.currentUser.email = email;
    this.currentUser.city = city;
    this.currentUser.street = street;
    this.currentUser.phoneNumber = phoneNumber;
    this.currentUser.passportNo = passportNo;

    this._userService.updateUser(this.currentUser).subscribe((res: any) => {});
    //this._userService.updateUser(this.currentUser);

    // } else {
    //   alert("Incorrect password!");
    //   return;
    // }
  }
}

import { Component, OnInit, Input } from "@angular/core";
import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-friends-data-list",
  templateUrl: "./friends-data-list.component.html",
  styleUrls: ["./friends-data-list.component.css"],
})
export class FriendsDataListComponent implements OnInit {
  friends: UserModel[];
  constructor(private userService: UsersService) {}

  removeFriend(email: string) {
    this.userService
      .removeFriend(localStorage.getItem("userId"), email)
      .subscribe();

    let index = this.friends.map((x) => x.email).indexOf(email);

    this.friends.splice(index, 1);
  }
  checkPhoto(user: UserModel) {
    if (user.image != undefined && user.image != "") {
      return environment.serverAddress + "/Resources/Users/" + user.image;
    } else {
      return "../../assets/face.png";
    }
  }
  ngOnInit(): void {
    // this.userService.getAllFriends("vule993@outlook.com").subscribe((data) => {
    //   this.friends = data;
    // });
    this.userService
      .getAllFriends(localStorage.getItem("userId"))
      .subscribe((data) => {
        this.friends = data;
      });
    debugger;
  }
}

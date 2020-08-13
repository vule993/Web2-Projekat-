import { Component, OnInit, Input } from "@angular/core";
import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-friends-data-list",
  templateUrl: "./friends-data-list.component.html",
  styleUrls: ["./friends-data-list.component.css"],
})
export class FriendsDataListComponent implements OnInit {
  friends: UserModel[];
  constructor(private userService: UsersService) {}
  removeFriend(mail: number) {
    alert(mail);
  }

  ngOnInit(): void {
    this.userService.getAllFriends("vule993@outlook.com").subscribe((data) => {
      this.friends = data;
    });
  }
}

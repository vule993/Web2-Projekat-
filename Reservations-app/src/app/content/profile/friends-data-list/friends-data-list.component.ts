import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-friends-data-list",
  templateUrl: "./friends-data-list.component.html",
  styleUrls: ["./friends-data-list.component.css"]
})
export class FriendsDataListComponent implements OnInit {
  allUsers: User[];
  constructor(private userService: UsersService) {
    this.allUsers = userService.loadAllUsers();
  }

  ngOnInit(): void {}
}

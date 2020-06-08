import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  allUsers: any;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => (this.allUsers = users));
  }
}

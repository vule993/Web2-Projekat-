import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: [
    "./users.component.css",
    "../../../user-list/user-list.component.css"
  ]
})
export class UsersComponent implements OnInit {
  allUsers;
  filteredUsers;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = users;
    });
  }

  findUser(pattern: string) {
    this.filteredUsers = [];
    (this.allUsers as UserModel[]).forEach(user => {
      if (
        user.firstName.toLowerCase().includes(pattern.toLowerCase()) ||
        user.lastName.toLowerCase().includes(pattern.toLowerCase()) ||
        user.email.toLowerCase().includes(pattern.toLowerCase())
      ) {
        this.filteredUsers.push(user);
      }
    });
  }

  removeUser(userEmail: string) {}
}

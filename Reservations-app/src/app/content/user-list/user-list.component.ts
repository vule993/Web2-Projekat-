import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  allUsers;
  filteredUsers;
  currentUSersFriends: UserModel[];
  constructor(private _userService: UsersService) {}

  //filter
  findUser(pattern: string) {
    this.filteredUsers = [];
    (this.allUsers as UserModel[]).forEach((user) => {
      if (
        user.firstName.toLowerCase().includes(pattern.toLowerCase()) ||
        user.lastName.toLowerCase().includes(pattern.toLowerCase()) ||
        user.email.toLowerCase().includes(pattern.toLowerCase())
      ) {
        this.filteredUsers.push(user);
      }
    });
  }

  isFriend(email: string): boolean {
    for (let i = 0; i < this.currentUSersFriends.length; i++) {
      if (this.currentUSersFriends[i].email == email) {
        return true;
      }
    }
    // this.currentUSersFriends.forEach((friend) => {
    //   if (friend.email == email) {
    //     return true;
    //   }
    // });
    return false;
  }

  addFriend(friendsEmail: string) {
    this._userService
      .addFriend(localStorage.getItem("email"), friendsEmail)
      .subscribe();

    this.currentUSersFriends.push(
      (this.allUsers as UserModel[]).find((user) => user.email == friendsEmail)
    );
  }

  removeFriend(friendsEmail: string) {
    this._userService
      .removeFriend(localStorage.getItem("email"), friendsEmail)
      .subscribe();

    let id = this.currentUSersFriends
      .map(function (x) {
        return x.email;
      })
      .indexOf(friendsEmail);
    this.currentUSersFriends.splice(id, 1);
  }

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((users) => {
      //pronalazim id trenutno ulogovanog korisnika
      //uklanjam ga iz liste korisnika jer nece dodavati samog sebe
      let id = users
        .map(function (x) {
          return x.email;
        })
        .indexOf(localStorage.getItem("email"));
      users.splice(id, 1);
      //setujem potrebne promenljive
      this.allUsers = users;
      this.filteredUsers = users;
    });
    this._userService
      .getAllFriends(localStorage.getItem("email"))
      .subscribe((friends) => (this.currentUSersFriends = friends));
  }
}

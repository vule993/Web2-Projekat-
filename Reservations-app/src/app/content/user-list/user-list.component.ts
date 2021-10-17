import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  allUsers = [];
  filteredUsers = [];
  currentUSersFriends = [];

  serverAddress = environment.serverAddress;

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
  /**
   * Returns if users are friends
   *
   * @param email - email from current user from all users loop
   * @returns Returns if user with passed email is friend with logged user.
   *
   * @beta
   */
  isFriend(email: string): boolean {
    for (let i = 0; i < this.currentUSersFriends.length; i++) {
      if (this.currentUSersFriends[i].email == email) {
        return true;
      }
    }

    return false;
  }

  addFriend(friendsEmail: string) {
    //pozivam servis koji azurira bazu podataka
    this._userService
      .addFriend(localStorage.getItem("userId"), friendsEmail)
      .subscribe();
    //dodajem u trenutnu listu kako bi promene bile odmah vidljive
    this.currentUSersFriends.push(
      (this.allUsers as UserModel[]).find((user) => user.email == friendsEmail)
    );

    //dodajem u localstorage da bi se prikazivalo na svako osvezavanje stranice
    let loggedUser = JSON.parse(localStorage.getItem("user")) as UserModel;

    loggedUser.friends.push(
      (this.allUsers as UserModel[]).find((user) => user.email == friendsEmail)
    );
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }

  removeFriend(friendsEmail: string) {
    this._userService
      .removeFriend(localStorage.getItem("userId"), friendsEmail)
      .subscribe();

    //uklanjanje iz lokalne liste kako bi se prikaz azurirao
    let id = this.currentUSersFriends
      .map(function (x) {
        return x.email;
      })
      .indexOf(friendsEmail);
    this.currentUSersFriends.splice(id, 1);

    let user = <UserModel>JSON.parse(localStorage.getItem("user"));
    var friendsWithoutUnfriended = user.friends.filter(
      (friend) => friend.email != friendsEmail //sve vrati koji nisu uklonjeni prijatelj
    );
    this.currentUSersFriends = friendsWithoutUnfriended;
  }

  ngOnInit(): void {
    let currentUsersEmail = localStorage.getItem("userId");
    this._userService.getAllUsers().subscribe((users) => {
      //pronalazim id trenutno ulogovanog korisnika
      //uklanjam ga iz liste korisnika jer nece dodavati samog sebe

      let id = users
        .map(function (x) {
          return x.email;
        })
        .indexOf(currentUsersEmail);

      users.splice(id, 1);
      //uklanjam guest usere, oni se dodaju samo onome ko ih kreira

      //setujem potrebne promenljive
      this.allUsers = users.filter((user) => user.status != "Guest");
      this.filteredUsers = users.filter((user) => user.status != "Guest");
    });
    this._userService.getAllFriends(currentUsersEmail).subscribe((friends) => {
      this.currentUSersFriends = friends;
    });
  }
}

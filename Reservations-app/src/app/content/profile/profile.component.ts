import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../models/User.model";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { stripSummaryForJitNameSuffix } from "@angular/compiler/src/aot/util";
import { STORAGE_USER_ID_KEY } from "src/app/const/constants";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  activeTab;
  allUsers: UserModel[];
  public currentUser: UserModel = null;
  constructor(private userService: UsersService, private router: Router) {
    this.allUsers = userService.loadAllUsers();

    // pretplacujemo se na dogadjaj ponovnog klika na link profila(posto se ne ucitava
    // kompletna komponenta ova metoda menja this.activeTab na default vrednost)
  }

  ngOnInit(): void {
    let fullUrl = window.location.href;
    this.activeTab = fullUrl.split("/")[4];
    let email = localStorage.getItem("userId");
    console.log("Ulogovan je: " + email);
    this.userService.getUserProfile().subscribe((user: UserModel) => {
      this.currentUser = <UserModel>user;

      if (this.currentUser.status == "Admin") {
        this.router.navigateByUrl("admin/head-admin/profile");
      }
      if (this.currentUser.status == "CarAdmin") {
        this.router.navigate(["car"]);
      }
      if (this.currentUser.status == "AvioAdmin") {
        this.router.navigate(["avio"]);
      }
      // localStorage.setItem("name", user.firstName);
      // localStorage.setItem("surname", user.lastName);
      //dodati i ostalo
    });

    // this.userService
    //   .getLoggedInUser()
    //   .subscribe((user: UserModel) => (this.currentUser = user));
    //ovde moze da se pogodi metoda getUserProfile() iz userService-a i da se uzmu podaci korisnika
    //ona vraca observable kolekciju, samo ide .subscribe i kupe se podaci...
    //objekat koji ce se vratiti je:
    /*
      {
        user.FirstName,
        user.LastName,
        user.UserName,
        user.Email,
        user.Street,
        user.City,
        user.PhoneNumber,
      }
    */
  }

  // setuje koji je tab selektovan kako bi dobio drugaciji background
  setActiveTab(value) {
    this.activeTab = value;
  }

  onProfilePictureHover() {
    var element = document.getElementById("photo-icon");
    let i = 0;
    let animation = setInterval(() => {
      element.style.opacity = i.toString();
      i += 0.1;
      if (i > 0.6) {
        clearInterval(animation);
      }
    }, 50);
  }
  onProfilePictureLeave() {
    var element = document.getElementById("photo-icon");
    let i = 0.6;
    let animation = setInterval(() => {
      element.style.opacity = i.toString();
      i -= 0.1;
      if (i < 0) {
        clearInterval(animation);
      }
    }, 50);
  }

  onProfilePictureClick() {
    alert("Change picturre dialog...");
  }
}

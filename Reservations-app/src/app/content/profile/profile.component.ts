import { Component, OnInit } from "@angular/core";
import { User } from "../../models/User.model";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { stripSummaryForJitNameSuffix } from "@angular/compiler/src/aot/util";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  activeTab;
  allUsers: User[];
  public currentUser;
  constructor(private userService: UsersService, router: Router) {
    this.allUsers = userService.loadAllUsers();

    // pretplacujemo se na dogadjaj ponovnog klika na link profila(posto se ne ucitava
    // kompletna komponenta ova metoda menja this.activeTab na default vrednost)
    router.events.subscribe((val) => {
      let fullUrl = window.location.href;
      this.activeTab = fullUrl.split("/")[4];
    });
  }

  ngOnInit(): void {
    let fullUrl = window.location.href;
    this.activeTab = fullUrl.split("/")[4];
    this.userService.getUserProfile().subscribe((user: any) => {
      this.currentUser = user;
      localStorage.setItem("name", user.firstName);
      localStorage.setItem("surname", user.lastName);
      //dodati i ostalo
    });
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

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UsersService } from "../services/users.service";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  open = true;
  notificationsOpen = false;

  serverAddress = environment.serverAddress;
  profilePicture;

  constructor(private router: Router, private userService: UsersService) {}

  onNotificationClick() {
    if (this.notificationsOpen) {
      $(document).ready(function() {
        $("#notifications-list").fadeIn("slow", function() {});
      });
    } else {
      $(document).ready(function() {
        $("#notifications-list").fadeOut("slow", function() {});
      });
    }

    this.notificationsOpen = this.notificationsOpen ? false : true;
  }

  onClick(event) {
    var image = (document.getElementById("nav-icon").style.pointerEvents =
      "none");

    var nav = document.getElementsByTagName("nav")[0];
    var navigation = document.getElementById("navigation");

    if (!this.open) {
      nav.classList.add("transform-active");

      let timer = setTimeout(() => {
        navigation.classList.remove("display-none");
        image = document.getElementById("nav-icon").style.pointerEvents =
          "auto";
      }, 500);

      this.open = true;
    } else {
      nav.classList.remove("transform-active");

      let timer = setTimeout(() => {
        navigation.classList.add("display-none");
        image = document.getElementById("nav-icon").style.pointerEvents =
          "auto";
      }, 10);

      this.open = false;
    }
  }

  ngOnInit(): void {}

  chechIfAdmin() {
    if (this.userService.roleMatch(["Admin"])) {
      return true;
    } else {
      return false;
    }
  }

  checkIfCarAdmin() {
    if (this.userService.roleMatch(["CarAdmin"])) {
      return true;
    } else {
      return false;
    }
  }

  checkIfAvioAdmin() {
    if (this.userService.roleMatch(["AvioAdmin"])) {
      return true;
    } else {
      return false;
    }
  }

  checkIfLoggedIn() {
    if (localStorage.getItem("token") != null) {
      return true;
    } else return false;
  }

  logOut() {
    // localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  profilePictureDecide() {
    let stored = localStorage.getItem("image");

    if (stored != "null" && stored != "" && stored != undefined) {
      return (
        this.serverAddress + "/Resources/Users/" + localStorage.getItem("image")
      );
    }
    return "../../assets/face.png";
  }
}

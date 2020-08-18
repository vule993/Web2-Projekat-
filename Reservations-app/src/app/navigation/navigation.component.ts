import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  open = true;
  notificationsOpen = false;
  constructor(private router: Router) {}

  onNotificationClick() {
    if (this.notificationsOpen) {
      $(document).ready(function () {
        $("#notifications-list").fadeIn("slow", function () {});
      });
    } else {
      $(document).ready(function () {
        $("#notifications-list").fadeOut("slow", function () {});
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
}

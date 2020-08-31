import { Component, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UsersService } from "../services/users.service";
import { ReservationNotification } from "../models/ReservationNotification";
import { NotificationService } from "../services/notification.service";
import { ReservationService } from "../services/reservation.service";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  open = true;
  notificationsOpen = false;

  serverAddress = environment.serverAddress;
  profilePicture;
  notifications: ReservationNotification[] = [];
  notificationCount: number = 0;
  constructor(
    private router: Router,
    private userService: UsersService,
    private _notificationService: NotificationService,
    private _reservationService: ReservationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }
  //
  acceptNotification(notification: ReservationNotification) {
    this._reservationService
      .acceptReservation(notification.reservationId)
      .subscribe((x) => {
        this._notificationService
          .resolveNotification(notification.id)
          .subscribe();
      });
  }
  //
  declineNotification(notification: ReservationNotification) {
    this._reservationService
      .declineReservation(notification.reservationId)
      .subscribe((x) => {
        this._notificationService
          .resolveNotification(notification.id)
          .subscribe();
      });
  }

  ngOnInit(): void {
    debugger;
    this._notificationService
      .getAllReservationNotifications(localStorage.getItem("userId"))
      .subscribe((notifications) => {
        (notifications as ReservationNotification[]).forEach((n) => {
          debugger;
          if (n.status == 0)
            this.notificationCount = this.notificationCount + 1;
          if (n.status != 2) this.notifications.push(n); //2 je da je resolvovana notifikacija
        });

        this.notificationCount = this.notifications.length;
      });
  }

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
    //setujem ih na vidjene da se ne prikazuju u prozoru
    this.notifications.forEach((n) => {
      this._notificationService
        .markReservationNotificationAsViewd(n.id)
        .subscribe();
    });
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

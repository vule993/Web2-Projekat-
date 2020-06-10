import { Component, OnInit, Input } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/User.model";
import { Seat } from "src/app/models/Seat.model";

declare var $: any;
@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"]
})
export class AirlineReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  selectedSeatsNo;
  selectedSeats: Seat[] = [];
  users;
  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService
  ) {}
  onFinish() {}
  onCheck(event, user: User) {
    let element = event.currentTarget.lastElementChild;
    if ($(element).hasClass("uncheck")) {
      if (this.selectedSeatsNo - 1 < 1) {
        return;
      }
      //dodajem coveka na sediste
      $(element).removeClass("uncheck");
      $(element).addClass("check");

      for (let s of this.selectedSeats) {
        if (s.user == null) {
          s.user = user;
          this.selectedSeatsNo--;
          break;
        }
      }
    } else {
      //uklanjam coveka sa sedista
      $(element).removeClass("check");
      $(element).addClass("uncheck");
      for (let s of this.selectedSeats) {
        if (s.user == user) {
          s.user = null;
          this.selectedSeatsNo++;
          break;
        }
      }
    }
    this.selectedSeatsNo = this.selectedSeats.filter(
      seat => seat.user == null
    ).length;
  }
  ngOnInit(): void {
    this.users = this.userService.allUsers();
    this.selectedSeatService.selectedSeats.subscribe(allSeats => {
      this.selectedSeats = allSeats;
      if (allSeats != null)
        this.selectedSeatsNo = this.selectedSeats.filter(
          seat => seat.user == null
        ).length;
    });
  }
}

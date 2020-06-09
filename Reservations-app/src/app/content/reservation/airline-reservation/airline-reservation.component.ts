import { Component, OnInit, Input } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/User.model";

@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"],
})
export class AirlineReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  selectedSeatsNo = 0;
  selectedSeats = [];
  users;
  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService
  ) {}
  onCheck(user: User) {
    this.selectedSeats.forEach((seat, index) => {
      if (seat.user === null) {
        seat.user = user;
      }
    });
  }
  ngOnInit(): void {
    this.users = this.userService.allUsers();
    this.selectedSeatService.selectedSeats.subscribe(
      (seats) => (this.selectedSeats = seats)
    );
  }
}

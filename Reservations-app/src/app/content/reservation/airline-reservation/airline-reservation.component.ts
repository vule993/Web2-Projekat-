import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { Seat } from "src/app/models/Seat.model";
import { Passenger } from "src/app/models/Passenger.model";

declare var $: any;

@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"],
})
export class AirlineReservationComponent implements OnInit {
  @Output() event = new EventEmitter();
  suggestedCars: [];
  @Input() reservation: Reservation;
  selectedSeatsNo;
  selectedSeats: Seat[] = [];
  users;
  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService
  ) {}
  finish() {
    //ovde dodajes auta...

    //dobavi listu odgovarajucih rent-a-car
    this.event.emit(this.suggestedCars);

    //ovo ce kada  se klikne na finish da slajduje do njega i da ga prikaze
    $("#finish").slideDown(1200);
    $("html, body").animate(
      {
        scrollTop: $("#finish").offset().top,
      },
      1200
    );
    // do ovde sam ja dodavao
  }
  onCheck(event, user: UserModel) {
    let element = event.currentTarget.lastElementChild;
    if ($(element).hasClass("uncheck")) {
      if (this.selectedSeatsNo - 1 < 1) {
        return;
      }
      //dodajem coveka na sediste
      $(element).removeClass("uncheck");
      $(element).addClass("check");

      for (let s of this.selectedSeats) {
        if (s.passenger == null) {
          s.passenger = new Passenger(user);
          this.selectedSeatsNo--;
          break;
        }
      }
    } else {
      //uklanjam coveka sa sedista
      $(element).removeClass("check");
      $(element).addClass("uncheck");
      for (let s of this.selectedSeats) {
        if (s.passenger.user == user) {
          s.passenger = null; //ako je to taj user -> skidam passenger-a
          this.selectedSeatsNo++;
          break;
        }
      }
    }
    this.selectedSeatsNo = this.selectedSeats.filter(
      (seat) => seat.passenger == null
    ).length;
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
    //this.users = this.userService.getAllUsers();

    $(window).resize(function () {
      let h = +$("#seat-picker").css("height").split("px")[0];

      $("#friends-selector").css({ height: h + "px" });
      $(".friends").css({ height: h - 100 + "px" });
      $("html, body").animate(
        {
          scrollTop: $("#proceed").offset().top,
        },
        1200
      );
    });

    this.selectedSeatService.selectedSeats.subscribe((allSeats) => {
      this.selectedSeats = allSeats;
      if (allSeats != null)
        this.selectedSeatsNo = this.selectedSeats.filter(
          (seat) => seat.passenger == null
        ).length;
    });
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { Seat } from "src/app/models/Seat.model";
import { CarsService } from "src/app/services/cars.service";
import { CarCompany } from "src/app/models/CarCompany.model";
import { ReservationService } from "src/app/services/reservation.service";
import { CarReservation } from "src/app/models/CarReservation";
import { Passenger } from "src/app/models/Passenger.model";
import { FlightsService } from "src/app/services/flights.service";
import { Flight } from "src/app/models/Flight.model";

declare var $: any;

@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"],
})
export class AirlineReservationComponent implements OnInit {
  @Output() event = new EventEmitter();
  suggestedCars: CarReservation[] = [];
  @Input() flight: Flight;
  selectedSeatsNo;
  selectedSeats: Seat[] = [];

  users;
  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService,
    private carService: CarsService,
    private reservationService: ReservationService
  ) {}

  /*
  OBRATITI PAZNJU NA FINISH METODU, UMESTO RESERVATION JE FLIGHT
  */

  // finish() {
  //   //load specific car reservations based on a airline reservation...
  //   let destination = this.reservation.airlineReservation.flight.destinations[
  //     this.reservation.airlineReservation.flight.destinations.length - 1
  //   ];
  //   let startDate = this.reservation.airlineReservation.flight.startDate;
  //   let d1 = new Date(startDate);
  //   let endDate = this.reservation.airlineReservation.flight.returnDate;
  //   let d2 = new Date(endDate);

  //   this.reservationService.carReservations.forEach((cr) => {
  //     let carStartDate = new Date(cr.startDate);
  //     let carEndDate = new Date(cr.endDate);
  //     if (
  //       !cr.car.isReserved &&
  //       carStartDate <= d1 &&
  //       carEndDate >= d2 &&
  //       cr.carCompany.city == destination.city
  //     ) {
  //       this.suggestedCars.push(cr);
  //     }
  //   });

  //   //send to parent
  //   this.event.emit(this.suggestedCars);

  //   //ovo ce kada  se klikne na finish da slajduje do njega i da ga prikaze
  //   $("#finish").slideDown(1200);
  //   $("html, body").animate(
  //     {
  //       scrollTop: $("#finish").offset().top,
  //     },
  //     1200
  //   );
  // }

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
    this.userService
      .getAllFriends(localStorage.getItem("email"))
      .subscribe((users) => (this.users = users));
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

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
import { environment } from "src/environments/environment";
import { AirlineReservation } from "src/app/models/AirlineReservation";

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
  //da znam da l da odma saljem rez il da cekam rent a car
  takeRentACar = false;
  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService,
    private carService: CarsService,
    private reservationService: ReservationService
  ) {}

  /*
  OBRATITI PAZNJU NA FINISH METODU, UMESTO RESERVATION JE FLIGHT
  */
  proceedToRentACar() {
    this.takeRentACar = !this.takeRentACar;
  }
  finishAirlineReservation() {
    debugger;
    let i = this.flight;

    if (this.takeRentACar) {
      //prikazi rc
    } else {
      let reservation;
      this.selectedSeats.forEach((seat) => {
        //za svkaog coveka na sedistu pravim rezervaciju

        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() -
          environment.cancelAirlineReservationBefore +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        var dateTime = date + " " + time;

        reservation = new Reservation(
          0,
          new AirlineReservation(
            0,
            this.flight,
            new Passenger(0, "", "", "", "", true),
            "rok za otkaz",
            0,
            0,
            "datum potvrde za statistiku"
          ),
          null,
          false,
          false
        );
      });
    }
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
          s.passenger = new Passenger(
            0,
            user.email,
            user.firstName,
            user.lastName,
            "passportNumber",
            true
          );
          this.selectedSeatsNo--;
          break;
        }
      }
    } else {
      //uklanjam coveka sa sedista
      $(element).removeClass("check");
      $(element).addClass("uncheck");
      for (let s of this.selectedSeats) {
        //ovo promenjeno nakon update-a
        if (s.passenger.userEmail == user.email) {
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
      .getAllFriends(localStorage.getItem("userId"))
      .subscribe((users) => (this.users = users));
    //this.users = this.userService.getAllUsers();

    $(window)
      .resize(function () {
        let h = +$("#seat-picker").css("height").split("px")[0];

        $("#friends-selector").css({ height: h + "px" });
        $(".friends").css({ height: h - 100 + "px" });
        $("html, body").animate(
          {
            scrollTop: $("#proceed").offset().top,
          },
          1200
        );
      })
      .delay(50);
    debugger;
    this.selectedSeatService.selectedSeats.subscribe((allSeats) => {
      this.selectedSeats = allSeats;
      if (allSeats != null)
        this.selectedSeatsNo = this.selectedSeats.filter(
          (seat) => seat.passenger == null
        ).length;
    });
  }
}

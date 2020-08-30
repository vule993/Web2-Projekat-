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
import { FlightsService } from "src/app/services/flights.service";
import { Flight } from "src/app/models/Flight.model";
import { AirlineReservation } from "src/app/models/AirlineReservation";
import { Car } from "src/app/models/car.model";
import { CarOffer } from "src/app/models/carOffer.model";
import { FormModel } from "src/app/models/formModel";
import { InviteFriend } from "src/app/models/InviteFriend.model";
import { ThrowStmt } from "@angular/compiler";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";

declare var $: any;

@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"],
})
export class AirlineReservationComponent implements OnInit {
  @Output() event = new EventEmitter(); //???
  suggestedCars: CarReservation[] = [];
  allCarsToShow: Car[] = [];
  carCompany: CarCompany;
  carOffers: CarOffer[] = [];
  takeRentACar = false;

  @Input() flight: Flight;
  currentUser: UserModel;
  currentUserSituated = false;
  selectedSeats: Seat[] = [];
  users: UserModel[];

  public months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(
    private selectedSeatService: SelectedseatsService,
    private userService: UsersService,
    private carService: CarsService,
    private reservationService: ReservationService
  ) {}

  proceedToRentACar() {
    this.takeRentACar = !this.takeRentACar;

    if (!this.takeRentACar) {
      $("#finish").slideUp(1200);
      $("html, body").animate(
        {
          scrollTop: $("#space").offset().top + $("#space").outerHeight(true),
        },
        1200
      );
    }
  }

  prepareCars() {
    this.carService.fetchCars().subscribe((data) => {
      this.allCarsToShow = (data as Car[]).filter((c) => !c.isReserved);

      this.carOffers = [];

      this.allCarsToShow.forEach((c) => {
        this.carService.fetchCarCompanyByCarId(c.id).subscribe((company) => {
          this.carCompany = company as CarCompany;

          let carOffer = new CarOffer(c.description, c, this.carCompany, c.id);
          this.carOffers.push(carOffer);
        });
      });
    });

    //this.event.emit(this.carOffers);
    $("#cars").slideDown(1200);
    $("html, body").animate(
      {
        scrollTop: $("#cars").offset().top,
      },
      1200
    );
  }

  finishAirlineReservation() {
    this.takeRentACar ? this.prepareCars() : this.createReservation();
  }

  cancelDateCalculate(
    differenceHours,
    date: string[] = [],
    time: string[] = []
  ) {
    let dateObject = new Date();

    dateObject.setDate(+date[0]);
    dateObject.setMonth(this.getMonth(date[1]));
    dateObject.setFullYear(+date[2]);

    dateObject.setHours(+time[0] - differenceHours);
    dateObject.setMinutes(+time[1]);

    return dateObject;
  }

  getMonth(month: string): number {
    return this.months.findIndex((m) => m == month);
  }

  createReservation() {
    let reservation: Reservation;

    this.selectedSeats.forEach((seat) => {
      //za svkaog coveka na sedistu pravim rezervaciju

      //31-August-2020  format
      let date = this.flight.startDate.split("-");
      let time = this.flight.startTime.split(":");

      let rowWidth =
        this.flight.seatConfiguration.planeType.segmentOneWidth +
        this.flight.seatConfiguration.planeType.segmentTwoWidth +
        this.flight.seatConfiguration.planeType.segmentThreeWidth +
        this.flight.seatConfiguration.planeType.segmentFourWidth;

      reservation = new Reservation(
        0,
        new AirlineReservation(
          0,
          this.flight,
          seat.passengerEmail,
          this.cancelDateCalculate(3, date, time).toString(),
          Math.ceil(seat.seatNo / rowWidth) - 1,
          Math.ceil((seat.seatNo - 1) % rowWidth),
          "datum potvrde za statistiku"
        ),
        null,
        false,
        false
      );

      this.reservationService.createReservation(reservation).subscribe();
    });
  }

  addGuest() {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let passportNo = $("#passportNo").val();

    $("#firstName").val("");
    $("#lastName").val("");
    $("#email").val("");
    $("#passportNo").val("");

    this.userService
      .registerGuest(
        new InviteFriend(
          new FormModel(
            firstName,
            lastName,
            email,
            "0000",
            "",
            "",
            "",
            passportNo
          ),
          localStorage.getItem("userId")
        )
      )
      .subscribe((result) => {
        this.userService
          .getAllFriends(localStorage.getItem("userId"))
          .subscribe((friends) => {
            this.users = friends;
          });
      });
  }

  friendsToSelectNo() {
    return this.selectedSeats.filter((seat) => seat.passengerEmail == "")
      .length; //-1 za usera koji selektuje
  }

  onCheck(event, user: UserModel) {
    let element = event.currentTarget.lastElementChild;
    if ($(element).hasClass("uncheck")) {
      //prvo provera da li ima gde da se sedne
      if (this.friendsToSelectNo() <= 0) {
        alert("Popunjena su sva selektovana mesta!");
        return;
      }

      //onda idu ostali
      //dodajem coveka na sediste
      $(element).removeClass("uncheck");
      $(element).addClass("check");

      for (let s of this.selectedSeats) {
        if (s.passengerEmail == "") {
          s.passengerEmail = user.email;

          break;
        }
      }
    } else {
      //uklanjam coveka sa sedista
      $(element).removeClass("check");
      $(element).addClass("uncheck");
      for (let s of this.selectedSeats) {
        if (s.passengerEmail == "") continue;
        if (s.passengerEmail == user.email) {
          if (s.passengerEmail == localStorage.getItem("userId")) {
            this.currentUserSituated = false;
          }
          s.passengerEmail = ""; //ako je to taj user -> skidam passenger-a

          break;
        }
      }
    }
  }

  ngOnInit(): void {
    //resetujem cekirana sedista
    this.selectedSeatService.setSelectedSeats([]);
    this.selectedSeatService.setUnSelectedSeats([]);

    this.userService
      .getAllFriends(localStorage.getItem("userId"))
      .subscribe((users) => {
        this.users = users;
      });

    this.userService.getUserProfile().subscribe((user) => {
      this.currentUser = user;
    });

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

    //sta ako decekira sediste dok user sedi na njemu
    this.selectedSeatService.unSelectedSeats.subscribe((unSelectedSeats) => {
      debugger;
      //osloboditi usere sa sedista promeniti im check i isprazniti observable
      (unSelectedSeats as Seat[]).forEach((seat) => {
        if (seat.passengerEmail != "") {
          //i ovde uklanjamo inicijatora
          if (seat.passengerEmail == localStorage.getItem("userId")) {
            this.currentUserSituated = false;
            seat.passengerEmail = "";
            return; //prekidam da ne pukne greska sa uklanjanjem id-a
          }

          let passengerIndex = 0;
          this.users.forEach((user, index) => {
            if (user.email == seat.passengerEmail) {
              passengerIndex = index;
            }
          });
          alert(passengerIndex);
          $("#userId" + passengerIndex).removeClass("check");
          $("#userId" + passengerIndex).addClass("uncheck");

          seat.passengerEmail = "";
          return;
        }
      });
    });
    //sta ako cekira sediste
    this.selectedSeatService.selectedSeats.subscribe((allSeats) => {
      this.selectedSeats = allSeats;

      //dodajem glavnog ako ima gde da sedne

      if (!this.currentUserSituated && this.friendsToSelectNo() > 0) {
        alert("dodajem glavnog");
        for (let s of this.selectedSeats) {
          if (s.passengerEmail == "") {
            s.passengerEmail = this.currentUser.email;
            this.currentUserSituated = true;
            break;
          }
        }
      }
    });
  }
}

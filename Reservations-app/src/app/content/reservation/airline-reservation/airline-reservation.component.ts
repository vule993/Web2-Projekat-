import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { Seat, Row } from "src/app/models/Seat.model";
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
import { ReservationNotification } from "src/app/models/ReservationNotification";
import { NotificationService } from "src/app/services/notification.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: "app-airline-reservation",
  templateUrl: "./airline-reservation.component.html",
  styleUrls: ["./airline-reservation.component.css"],
})
export class AirlineReservationComponent implements OnInit {
  @Output() event = new EventEmitter(); //???
  allCarsToShow: Car[] = [];
  carCompany: CarCompany;
  carOffers: CarOffer[] = [];
  carCompanies: CarCompany[] = [];
  carReservation: CarReservation;
  takeRentACar = false;
  CarReservationForm: FormGroup;

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
    private reservationService: ReservationService,
    private _notificationService: NotificationService
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
    //load car companies
    this.carService.getCarCompanies().subscribe((data) => {
      this.carCompanies = data as CarCompany[];
      this.carCompanies.forEach((cp) => {
        if (
          cp.city.toLowerCase() ==
          this.flight.destinations[
            this.flight.destinations.length - 1
          ].city.toLowerCase()
        ) {
          this.carService.getCarsOfCompany(cp.id).subscribe((cars) => {
            this.allCarsToShow = (cars as Car[]).filter((c) => !c.isReserved);
            this.carOffers = [];

            this.allCarsToShow.forEach((c) => {
              this.carService
                .fetchCarCompanyByCarId(c.id)
                .subscribe((company) => {
                  this.carCompany = company as CarCompany;

                  let carOffer = new CarOffer(
                    c.description,
                    c,
                    this.carCompany,
                    c.id
                  );
                  this.carOffers.push(carOffer);
                });
            });
          });
        }
      });
    });

    //promeniti logiku, uzeti kompaniju na toj lokaciji gde user putuje i onda izlistati auta od te kompanije???
    /* this.carService.fetchCars().subscribe(data => {
      this.allCarsToShow = (data as Car[]).filter(c => !c.isReserved);

      this.carOffers = [];

      this.allCarsToShow.forEach(c => {
        this.carService.fetchCarCompanyByCarId(c.id).subscribe(company => {
          this.carCompany = company as CarCompany;

          let carOffer = new CarOffer(c.description, c, this.carCompany, c.id);
          this.carOffers.push(carOffer);
        });
      });
    }); */

    //this.event.emit(this.carOffers);
    $("#cars").slideDown(1200);
    $("html, body").animate(
      {
        scrollTop: $("#cars").offset().top,
      },
      1200
    );
  }

  MakeCarReservation(selectedOffer: CarOffer) {
    let startDate = this.CarReservationForm.value["startDate"];
    let endDate = this.CarReservationForm.value["endDate"];

    this.carReservation = new CarReservation(
      selectedOffer.car,
      selectedOffer.carCompany,
      startDate,
      endDate,
      selectedOffer.car.id,
      selectedOffer.car.price * this.calcuatePrice(endDate, startDate),
      localStorage.getItem("userId")
    );

    this.createReservation();
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
    let notification: ReservationNotification;
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
        null
      );
      //probacu da notifikacije kreiram na back-u
      //
      if (this.takeRentACar) {
        //let r = new Reservation(0, null, this.carReservation);
        //this.reservationService.createReservation(reservation).subscribe();
        reservation.carReservation = this.carReservation;
      }

      this.reservationService.createReservation(reservation).subscribe((r) => {
        notification = new ReservationNotification(
          0,
          localStorage.getItem("userId"),
          seat.passengerEmail,
          (r as Reservation).id,
          localStorage.getItem("userId") + " invites you to a trip!",
          0
        );
        debugger;
        this._notificationService
          .createReservationNotification(notification)
          .subscribe();
      });
    }); //kraj petlje

    //evo ubacio sam ja

    if (this.takeRentACar) {
      let r = new Reservation(0, null, this.carReservation);
      this.reservationService
        .createReservation(reservation)
        .subscribe((r) => {});
    }

    window.location.href = "http://localhost:4200/profile/friends";
  }

  addGuest() {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let passportNo = $("#passportNo").val();

    if (email == undefined || email == "") {
      alert("Email is required!");
      return;
    }

    if (passportNo == undefined || passportNo == "") {
      alert("Passport number is required!");
      return;
    }

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
        alert("Please check more seats!");
        return;
      } else {
        if (this.checkIfAlreadyReserved(user)) {
          alert("This user already reserved a ticket for this flight!");
          return;
        } else {
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

  checkIfAlreadyReserved(user: UserModel): boolean {
    let rows: Row[] = this.flight.seatConfiguration.seats;

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].seats.length; j++) {
        if (rows[i].seats[j].passengerEmail == user.email) {
          return true;
        }
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.initForm();
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
          //alert(passengerIndex);
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
        if (
          this.currentUser.passportNo == null ||
          this.currentUser.passportNo == undefined ||
          this.currentUser.passportNo == ""
        )
          alert("Update your passport number on your profile!");

        if (!this.checkIfAlreadyReserved(this.currentUser)) {
          for (let s of this.selectedSeats) {
            if (s.passengerEmail == "") {
              s.passengerEmail = this.currentUser.email;
              this.currentUserSituated = true;
              break;
            }
          }
        } else {
          alert(
            "You are already reserved your ticket! You can call friends! :)"
          );
          return;
        }
      }
    });
  }

  calcuatePrice(date1: Date, date2: Date) {
    let oneDay = 1000 * 60 * 60 * 24;
    let difference = Math.abs(
      new Date(date1).getTime() - new Date(date2).getTime()
    );

    return Math.round(difference / oneDay);
  }

  initForm() {
    let startDate = null;
    let endDate = null;

    this.CarReservationForm = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required),
    });
  }
}

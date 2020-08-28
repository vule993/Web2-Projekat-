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
import { environment } from "src/environments/environment";
import { AirlineReservation } from "src/app/models/AirlineReservation";
import { Car } from "src/app/models/car.model";
import { CarOffer } from "src/app/models/carOffer.model";
import { FormModel } from "src/app/models/formModel";

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
  selectedSeatsNo = 0;
  situatedUsersNo = 0;
  currentUserSituated = false;
  selectedSeats: Seat[] = [];
  users;
  allCarsToShow: Car[] = [];
  carCompany: CarCompany;
  carOffers: CarOffer[] = [];
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

    /*
    
    */

    if (this.takeRentACar) {
      //prikazi rc
      //load cars
      this.carService.fetchCars().subscribe((data) => {
        this.allCarsToShow = (data as Car[]).filter((c) => !c.isReserved);

        this.allCarsToShow.forEach((c) => {
          this.carService.fetchCarCompanyByCarId(c.id).subscribe((company) => {
            this.carCompany = company as CarCompany;

            let carOffer = new CarOffer(
              c.description,
              c,
              this.carCompany,
              c.id
            );
            this.carOffers.push(carOffer);

            //this.resultsLoaded = true;
            console.log(this.carOffers);
          });
        });
      });

      this.event.emit(this.carOffers);
      $("#finish").slideDown(1200);
      $("html, body").animate(
        {
          scrollTop: $("#finish").offset().top,
        },
        1200
      );
      debugger;
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
            new UserModel("", "", "", "", "", "", "", "", ""),
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
  }

  addGuest() {
    let firstName = $("#firstName");
    let lastName = $("#lastName");
    let email = $("#email");
    this.userService.registerGuest(
      new FormModel(firstName, lastName, email, "0000", "", "", "")
    );
  }

  onCheck(event, user: UserModel) {
    let element = event.currentTarget.lastElementChild;
    if ($(element).hasClass("uncheck")) {
      //prvo provera da li ima gde da se sedne
      if (this.situatedUsersNo == this.selectedSeatsNo) {
        alert("Popunjena su sva selektovana mesta!");
        return;
      }
      //provera da li je smesten user koji zove sve ostale
      if (!this.currentUserSituated) {
        alert("dodajem glavnog");
        this.selectedSeats[0].passenger = new UserModel(
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""
        );
      }
      //onda idu ostali
      //dodajem coveka na sediste
      $(element).removeClass("uncheck");
      $(element).addClass("check");

      for (let s of this.selectedSeats) {
        if (s.passenger == null) {
          s.passenger = new UserModel("", "", "", "", "", "", "", "", "");
          this.situatedUsersNo++;
          break;
        }
      }
    } else {
      //uklanjam coveka sa sedista
      $(element).removeClass("check");
      $(element).addClass("uncheck");
      for (let s of this.selectedSeats) {
        //ovo promenjeno nakon update-a
        if (s.passenger.email == user.email) {
          s.passenger = null; //ako je to taj user -> skidam passenger-a
          this.situatedUsersNo--;
          break;
        }
      }
    }
    // this.selectedSeatsNo = this.selectedSeats.filter(
    //   (seat) => seat.passenger == null
    // ).length;
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

    this.selectedSeatService.selectedSeats.subscribe((allSeats) => {
      this.selectedSeats = allSeats;
      debugger;
      if (allSeats != null)
        this.selectedSeatsNo = this.selectedSeats.filter(
          (seat) => seat.passenger == null
        ).length;
    });
  }
}

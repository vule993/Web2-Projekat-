import { Component, OnInit } from "@angular/core";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";
import { environment } from "src/environments/environment";
import { FlightRating } from "src/app/models/FlightRating.model";

declare var $: any;

@Component({
  selector: "app-archive-data-list",
  templateUrl: "./archive-data-list.component.html",
  styleUrls: ["./archive-data-list.component.css"],
})
export class ArchiveDataListComponent implements OnInit {
  myReservations: Reservation[] = [];
  stars = [1, 2, 3, 4, 5];
  rate = 1;
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

  constructor(private _reservationService: ReservationService) {}

  getMonth(month: string): number {
    return this.months.findIndex((m) => m == month);
  }
  //ako je trenutno vreme presisalo vreme rezervacije vraca true
  checkDatePass(
    startDate,
    startTime,
    differenceHours = environment.cancelAirlineReservationBefore
  ) {
    let date = startDate.split("-");
    let time = startTime.split(":");

    let dateObject = new Date();

    dateObject.setDate(+date[0]);
    dateObject.setMonth(this.getMonth(date[1]));
    dateObject.setFullYear(+date[2]);

    dateObject.setHours(+time[0]);
    dateObject.setMinutes(+time[1]);

    let now = new Date();
    let bool = dateObject < now;
    debugger;
    return dateObject < now;
  }
  rateFlight(reservationId: string, reservation: Reservation) {
    let rate = $(reservationId).val();
    debugger;
    let flightRating = new FlightRating(
      0,
      localStorage.getItem("userId"),
      reservation.airlineReservation.flight.id,
      rate
    );

    this._reservationService.rateReservation(flightRating).subscribe();

    reservation.airlineReservation.rating = rate;
  }

  ngOnInit(): void {
    this._reservationService.getAllReservations().subscribe((reservations) => {
      (reservations as Reservation[]).forEach((r) => {
        if (
          (r.airlineReservation != null &&
            r.airlineReservation.passengerEmail ==
              localStorage.getItem("userId")) ||
          (r.carReservation != null &&
            r.carReservation.userEmail == localStorage.getItem("userId"))
        ) {
          //moja rzervacija, sad ispitujem da li je prosao termin
          if (
            this.checkDatePass(
              r.airlineReservation.flight.startDate,
              r.airlineReservation.flight.startTime
            )
          ) {
            debugger;
            if (!r.isFinished) {
              //ako je prosao datum a status joj jos nije promenjen ide u status finished
              this._reservationService.finishReservation(r.id).subscribe();
            }
            this.myReservations.push(r);
          }
        }
      });
    });
  }
}

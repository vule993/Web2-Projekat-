import { Component, OnInit } from "@angular/core";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-reservations-data-list",
  templateUrl: "./reservations-data-list.component.html",
  styleUrls: ["./reservations-data-list.component.css"],
})
export class ReservationsDataListComponent implements OnInit {
  myReservations: Reservation[] = [];
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

    return dateObject < now;
  }
  cancelReservation(reservation: Reservation) {
    this._reservationService.cancelReservation(reservation).subscribe();
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
          debugger;
          //moja rzervacija, sad ispitujem da li je prosao termin
          if (
            this.checkDatePass(
              r.airlineReservation.flight.startDate,
              r.airlineReservation.flight.startTime
            )
          ) {
            if (!r.isFinished) {
              //ako je prosao datum a status joj jos nije promenjen ide u status finished i ne dodaje se
              this._reservationService.finishReservation(r.id).subscribe();
            }
          } else {
            this.myReservations.push(r);
          }
        }
      });
    });
  }
}

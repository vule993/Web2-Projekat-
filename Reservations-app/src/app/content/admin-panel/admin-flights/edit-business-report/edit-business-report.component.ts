import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FlightsService } from "src/app/services/flights.service";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { Flight } from "src/app/models/Flight.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";
@Component({
  selector: "app-edit-business-report",
  templateUrl: "./edit-business-report.component.html",
  styleUrls: ["./edit-business-report.component.css"],
})
export class EditBusinessReportComponent implements OnInit {
  chart = [];
  company: AirlineCompany;
  flights: Flight[] = [];
  reservations: Reservation[] = [];
  constructor(
    private _flightService: FlightsService,
    private _avioService: AviocompaniesService,
    private _reservationService: ReservationService
  ) {}
  chose() {
    this.reservations.forEach((x) => alert(x.airlineReservation.flight.price));
  }
  ngOnInit(): void {
    this._avioService
      .getCompany(localStorage.getItem("userId"))
      .subscribe((company) => {
        this.company = company as AirlineCompany;
        this._reservationService.getAllReservations().subscribe((r) => {
          debugger;
          (r as Reservation[]).forEach((res) => {
            if (
              res.airlineReservation.flight.avioCompany.id == this.company.id &&
              res.isFinished
            ) {
              this.reservations.push(res);
            }
          });
        });
        this._flightService
          .getAllFlights()
          .subscribe((flights) => (this.flights = flights as Flight[]));
      });

    let jan = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "January"
    ).length;
    let feb = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "February"
    ).length;
    let mar = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "March"
    ).length;
    let apr = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "April"
    ).length;
    let may = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "May"
    ).length;
    let jun = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "June"
    ).length;
    let jul = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "July"
    ).length;
    let aug = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "August"
    ).length;
    let sep = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "September"
    ).length;
    let oct = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "October"
    ).length;
    let nov = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "November"
    ).length;
    let dec = this.reservations.filter(
      (r) => r.airlineReservation.flight.startDate.split("-")[1] == "December"
    ).length;

    this.chart[0] = new Chart("canvas", {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Avg",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Tickets by month",
            data: [
              jan,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                  "February"
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "March" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "April" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "May" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "June" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "July" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "August" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "September" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "October" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "November" && r.isFinished
              ).length,
              this.reservations.filter(
                (r) =>
                  r.airlineReservation.flight.startDate.split("-")[1] ==
                    "December" && r.isFinished
              ).length,
            ],
            backgroundColor: "red",
            borderColor: "red",
            fill: false,
          },
          // {
          //   label: "Plus",
          //   data: [1, 3, 5, 10, 65, 35, 320, 320, 500, 553, 400, 350].reverse(),
          //   backgroundColor: "blue",
          //   borderColor: "blue",
          //   fill: false,
          // },
          // {
          //   label: "Pro",
          //   data: [320, 450, 300, 220, 120, 200, 100, 50, 200, 220, 176, 200],
          //   backgroundColor: "purple",
          //   borderColor: "purple",
          //   fill: false,
          // },
        ],
      },
    });

    this.chart[1] = new Chart("canvas2", {
      type: "doughnut",

      data: {
        datasets: [
          {
            data: [10, 20, 30, 40, 60],
            backgroundColor: ["red", "pink", "yellow", "green", "blue"],
            borderColor: ["red", "pink", "yellow", "green", "blue"],
            fill: true,
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["1", "2", "3", "4", "6"],
      },
      options: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontFamily: "Roboto",
          },
        },
      },
    });

    this.chart[2] = new Chart("canvas3", {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Avg",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Basic",
            data: [1, 3, 5, 10, 65, 35, 320, 320, 500, 553, 400, 350],
            backgroundColor: "red",
            borderColor: "red",
            fill: false,
          },
          {
            label: "Plus",
            data: [1, 3, 5, 10, 65, 35, 320, 320, 500, 553, 400, 350].reverse(),
            backgroundColor: "blue",
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Pro",
            data: [320, 450, 300, 220, 120, 200, 100, 50, 200, 220, 176, 200],
            backgroundColor: "purple",
            borderColor: "purple",
            fill: false,
          },
        ],
      },
    });
    let avg =
      this.chart[1].data.labels.reduce((a, b) => parseInt(a) + parseInt(b)) / 5;
    document.getElementById("avg-display").innerHTML = avg.toString();
  }
}

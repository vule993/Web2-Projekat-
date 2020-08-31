import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FlightsService } from "src/app/services/flights.service";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { Flight } from "src/app/models/Flight.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Component({
  selector: "app-edit-business-report",
  templateUrl: "./edit-business-report.component.html",
  styleUrls: ["./edit-business-report.component.css"],
})
export class EditBusinessReportComponent implements OnInit {
  chart = [];
  company: AirlineCompany;
  flights: Flight[] = [];
  constructor(
    private _flightService: FlightsService,
    private _avioService: AviocompaniesService
  ) {}

  ngOnInit(): void {
    this._avioService
      .getCompany(localStorage.getItem("userId"))
      .subscribe((company) => {
        this.company = company as AirlineCompany;
        debugger;
        this._flightService.getAllFlights().subscribe((f) => {
          this.flights = f as Flight[];
        });
      });

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

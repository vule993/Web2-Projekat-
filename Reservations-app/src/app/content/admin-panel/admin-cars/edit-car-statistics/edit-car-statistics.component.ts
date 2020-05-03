import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { LineToLineMappedSource } from "webpack-sources";

@Component({
  selector: "app-edit-car-statistics",
  templateUrl: "./edit-car-statistics.component.html",
  styleUrls: ["./edit-car-statistics.component.css"]
})
export class EditCarStatisticsComponent implements OnInit {
  chart = [];

  constructor() {}

  ngOnInit(): void {
    this.chart = new Chart("canvas", {
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
          "Dec"
        ],
        datasets: [
          {
            label: "Basic",
            data: [1, 3, 5, 10, 65, 35, 320, 320, 500, 553, 400, 350],
            background: "red",
            borderColor: "red",
            fill: false
          },
          {
            label: "Plus",
            data: [1, 3, 5, 10, 65, 35, 320, 320, 500, 553, 400, 350].reverse(),
            background: "blue",
            borderColor: "blue",
            fill: false
          },
          {
            label: "Pro",
            data: [320, 450, 300, 220, 120, 200, 100, 50, 200, 220, 176, 200],
            background: "purple",
            borderColor: "purple",
            fill: false
          }
        ]
      }
    });

    this.chart = new Chart("canvas2", {
      type: "doughnut",

      data: {
        datasets: [
          {
            data: [10, 20, 30, 40],
            backgroundColor: ["red", "blue", "green", "gray"],
            borderColor: ["red", "blue", "green", "gray"],
            fill: true
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["WW", "BMW", "Audi", "Mercedez"]
      },
      options: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontFamily: "Roboto"
          }
        }
      }
    });
  }
}

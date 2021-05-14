import { Component, OnInit } from "@angular/core";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";
import { Address } from "src/app/models/address.model";
import { Flight } from "src/app/models/Flight.model";
import { FlightsService } from "src/app/services/flights.service";

declare var $: any;
@Component({
  selector: "app-airlines",
  templateUrl: "./airlines.component.html",
  styleUrls: ["./airlines.component.css"],
})
export class AirlinesComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;
  allAvioCompanies: AirlineCompany[] = [];
  //
  allFlightsToShow: Flight[];

  allFlights: Flight[] = [];
  allReservationsPreFilter: Flight[];
  //
  allDestinations: Destination[];

  sliderData = {
    title: "All companies",
    hints: ["Likes", "Address", "Description"],
    values: [],
  };

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
    private allAirlineCompaniesData: AviocompaniesService,
    private _flightsService: FlightsService,
    private destinationService: DestinationsService
  ) {}

  searchFlights() {
    this.allFlightsToShow = this.allFlights;
    if ($("#departDate").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter(
        (flight) =>
          new Date(flight.startDate) >= new Date($("#departDate").val())
      );
    }
    if ($("#returnDate").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter(
        (flight) =>
          new Date(flight.arrivingDate) >= new Date($("#returnDate").val())
      );
    }
    if ($("#startingAirport").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter(
        (flight) =>
          flight.destinations[0].airportName === $("#startingAirport").val()
      );
    }
    if ($("#endingAirport").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter(
        (flight) =>
          flight.destinations[flight.destinations.length - 1].airportName ===
          $("#endingAirport").val()
      );
    }
    this.allReservationsPreFilter = this.allFlightsToShow;
  }

  filterFlights() {
    this.allFlightsToShow = this.allReservationsPreFilter;

    if ($("#company").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter(
        (flight) => flight.avioCompany.name === $("#company").val()
      );
    }

    if ($("#price").val() != "") {
      this.allFlightsToShow = this.allFlightsToShow.filter((flight) => {
        let price = flight.price;
        let lowerPrice = $("#price").val().split("-")[0];
        let upperPrice = $("#price").val().split("-")[1];
        if (price >= lowerPrice && price <= upperPrice) {
          return true;
        }
        return false;
      });
    }

    if ($("#flightDuration").val() != "") {
      let pattern1 = /:/g;
      let pattern2 = /h:|min/g;
      //
      let lowerHr = $("#flightDuration").val().split("-")[0].split(pattern2)[0];
      let lowerMin = $("#flightDuration")
        .val()
        .split("-")[1]
        .split(pattern2)[1];
      let higherHr = $("#flightDuration")
        .val()
        .split("-")[1]
        .split(pattern2)[0];
      let higherMin = $("#flightDuration")
        .val()
        .split("-")[1]
        .split(pattern2)[1];
      //
      let lowerDate = new Date();
      lowerDate.setHours(lowerHr);
      lowerDate.setMinutes(lowerMin);
      //
      let higherDate = new Date();
      higherDate.setHours(higherHr);
      higherDate.setMinutes(higherMin);
      //
      let durationDate = new Date();
      //
      this.allFlightsToShow = this.allFlightsToShow.filter((flight) => {
        let duration = flight.estimationTime;
        let durationHr = +duration.split(pattern2)[0];
        let durationMin = +duration.split(pattern2)[1];

        durationDate.setHours(durationHr);
        durationDate.setMinutes(durationMin);
        if (lowerDate <= durationDate && durationDate <= higherDate) {
          return true;
        }
        return false;
      });
    }
  }

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }

  openFlight(id: number) {}

  getMonth(month: string): number {
    return this.months.findIndex((m) => m == month);
  }
  dateCalculate(date: string[] = [], time: string[] = [], differenceHours = 0) {
    let dateObject = new Date();

    dateObject.setDate(+date[0]);
    dateObject.setMonth(this.getMonth(date[1]));
    dateObject.setFullYear(+date[2]);

    dateObject.setHours(+time[0] - differenceHours);
    dateObject.setMinutes(+time[1]);

    return dateObject;
  }
  ngOnInit(): void {
    this.destinationService
      .getAll()
      .subscribe(
        (destinations) => (this.allDestinations = destinations as Destination[])
      );

    this._flightsService.getAllFlights().subscribe((flights) => {
      (flights as Flight[]).forEach((f) => {
        //
        let flightDate = this.dateCalculate(
          f.startDate.split("-"),
          f.startTime.split(":")
        );
        let currenDate = new Date();

        if (flightDate < currenDate) return;

        this.allFlights.push(f);
      });
    });

    this.allAirlineCompaniesData.getAllCompanies().subscribe((data) => {
      this.allAvioCompanies = data as AirlineCompany[];
      this.sliderData.values = [];
      this.allAvioCompanies.forEach((company) => {
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name, //reserved for card title
          v2: company.likes,
          v3: company.address as Address,
          v4: company.description,
        });
      });
    });

    this.departCalendar = $(function () {
      $("#departDate").datepicker({
        // format: "yyyy-mm-dd",
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });

    this.returnCalendar = $(function () {
      $("#returnDate").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });
  }
}

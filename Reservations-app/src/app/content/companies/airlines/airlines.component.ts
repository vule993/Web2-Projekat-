import { Component, OnInit } from "@angular/core";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";

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
  allReservations: Reservation[];
  allReservationsToShow: Reservation[];
  allReservationsPreFilter: Reservation[];
  allDestinations: Destination[];

  sliderData = {
    title: "All companies",
    hints: ["Likes", "Address", "Description"],
    values: [],
  };

  constructor(
    private allAirlineCompaniesData: AviocompaniesService,
    private reservationService: ReservationService,
    private destinationService: DestinationsService
  ) {}

  searchReservations() {
    this.allReservationsToShow = this.allReservations;
    if ($("#departDate").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) =>
          new Date(reservation.airlineReservation.flight.startDate) >=
          new Date($("#departDate").val())
      );
    }
    if ($("#returnDate").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) =>
          new Date(reservation.airlineReservation.flight.returnDate) >=
          new Date($("#returnDate").val())
      );
    }
    if ($("#startingAirport").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) =>
          reservation.airlineReservation.flight.startingDestination
            .airportName === $("#startingAirport").val()
      );
    }
    if ($("#endingAirport").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) =>
          reservation.airlineReservation.flight.endingDestination
            .airportName === $("#endingAirport").val()
      );
    }
    this.allReservationsPreFilter = this.allReservationsToShow;
  }

  filterReservations() {
    this.allReservationsToShow = this.allReservationsPreFilter;

    if ($("#company").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) =>
          reservation.airlineReservation.flight.company.name ===
          $("#company").val()
      );
    }

    if ($("#price").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) => {
          let price = reservation.airlineReservation.flight.price;
          let lowerPrice = $("#price").val().split("-")[0];
          let upperPrice = $("#price").val().split("-")[1];
          if (price >= lowerPrice && price <= upperPrice) {
            return true;
          }
          return false;
        }
      );
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
      this.allReservationsToShow = this.allReservationsToShow.filter(
        (reservation) => {
          let duration = reservation.airlineReservation.flight.estimationTime;
          let durationHr = +duration.split(pattern2)[0];
          let durationMin = +duration.split(pattern2)[1];

          durationDate.setHours(durationHr);
          durationDate.setMinutes(durationMin);
          if (lowerDate <= durationDate && durationDate <= higherDate) {
            return true;
          }
          return false;
        }
      );
    }
  }

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }

  openReservation(id: number) {}

  ngOnInit(): void {
    this.destinationService
      .getAll()
      .subscribe(
        (destinations) => (this.allDestinations = destinations as Destination[])
      );
    this.reservationService.allReservations.subscribe(
      (reservatons) => (this.allReservations = reservatons)
    );

    this.allAirlineCompaniesData.getAllCompanies().subscribe((data) => {
      this.allAvioCompanies = data as AirlineCompany[];
      this.sliderData.values = [];
      this.allAvioCompanies.forEach((company) => {
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name, //reserved for card title
          v2: company.likes,
          v3: company.address,
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

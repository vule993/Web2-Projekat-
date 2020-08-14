import { Component, OnInit } from "@angular/core";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";
import { DiscountService } from "src/app/services/discount.service";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { Flight } from "src/app/models/Flight.model";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { FlightsService } from "src/app/services/flights.service";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompanyProfileComponent } from "src/app/content/companies/airlines/airline-company-profile/airline-company-profile.component";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";

declare var $: any;

@Component({
  selector: "app-edit-flights",
  templateUrl: "./edit-flights.component.html",
  styleUrls: ["./edit-flights.component.css"],
})
export class EditFlightsComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;
  allDestinations: Destination[] = [];
  allDiscounts;
  allSeatConfigurations;

  //data necessary to create flight
  avioCompany: AirlineCompany;
  flightStops: Destination[] = []; //presedanja

  constructor(
    private destinationsService: DestinationsService,
    private discountsData: DiscountService,
    private seatConfigurationsService: SeatsConfigService,
    private _avioCompanyService: AviocompaniesService,
    private _flightService: FlightsService
  ) {}

  ngOnInit(): void {
    this.destinationsService.getAll().subscribe((destinations) => {
      (destinations as Destination[]).forEach((destination) => {
        this.allDestinations.push(
          new Destination(
            destination.id,
            destination.airportName,
            destination.city,
            destination.country,
            destination.airportName
          )
        );
      });
    });

    this.discountsData.allDiscounts.subscribe(
      (allDiscounts) => (this.allDiscounts = allDiscounts)
    );

    this.seatConfigurationsService
      .getAllSeatConfigurations()
      .subscribe(
        (allSeatConfigurations) =>
          (this.allSeatConfigurations = allSeatConfigurations)
      );

    this.departCalendar = $(function () {
      $("#startDate").datepicker({
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

    this._avioCompanyService
      .getCompany(localStorage.getItem("email"))
      .subscribe((company: AirlineCompany) => (this.avioCompany = company));
  }

  createFlight() {
    let destinationIds = [];
    $("input:checkbox[name=stops]:checked").each(function () {
      destinationIds.push($(this).val());
    });

    for (let i = 0; i < destinationIds.length; i++) {
      let destination = this.allDestinations.find(
        (d) => d.id == destinationIds[i]
      );
      this.flightStops.push(destination);
    }

    //TREBA NAPRAVITI SEAT CONFIG GET, GET ALL, PUT metode i izvuci ovde trazenu preko servisa
    let planeTypeName = $("#planeType").val();
    //
    let planeType: SeatConfiguration = this.allSeatConfigurations.find(
      (element) => element.name == planeTypeName
    );

    let flight = new Flight(
      0,
      this.avioCompany,
      $("#startDate").val(),
      $("#returnDate").val(),
      $("#startTime").val(),
      $("#endTime").val(),
      $("#distance").val(),
      $("#estimationTime").val(),
      5,
      planeType,
      this.flightStops,
      "",
      $("#price").val(),
      ""
    );

    this._flightService.createFlight(flight).subscribe();
  }
}

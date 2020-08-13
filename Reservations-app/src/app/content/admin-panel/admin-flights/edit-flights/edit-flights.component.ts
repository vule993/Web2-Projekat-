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
  stops: Destination[]; //presedanja

  constructor(
    private destinationsService: DestinationsService,
    private discountsData: DiscountService,
    private seatConfigurationsData: SeatsConfigService,
    private _avioCompanyService: AviocompaniesService
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

    this.allSeatConfigurations = this.seatConfigurationsData.loadAllSeatConfigurations();

    this.departCalendar = $(function () {
      $("#departTime").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });

    this.returnCalendar = $(function () {
      $("#returnTime").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });

    this._avioCompanyService
      .getCompany(localStorage.getItem("email"))
      .subscribe((company: AirlineCompany) => (this.avioCompany = company));
  }

  createFlight() {
    //TREBA NAPRAVITI SEAT CONFIG GET, GET ALL, PUT metode i izvuci ovde trazenu preko servisa
    let planeTypeName = $("#planeType").val();
    //
    let planeType: SeatConfiguration;

    let flight = new Flight(
      0,
      this.avioCompany,
      this.stops[0],
      this.stops[this.stops.length - 1],
      $("#startDate").val(),
      $("#returnDate").val(),
      $("#startTime").val(),
      $("#endTime").val(),
      $("#distance").val(),
      $("#estimationTime").val(),
      $("#discount").val(),
      planeType,
      this.stops,
      $("#otherServices").val(),
      $("#price").val(),
      $("#luggage").val()
    );
  }
}

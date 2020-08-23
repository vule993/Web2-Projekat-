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
import { PlaneServicesService } from "src/app/services/plane-services.service";
import { PlaneService } from "src/app/models/PlaneService.model";
import { environment } from "src/environments/environment";
import { debounceTime } from "rxjs/operators";

declare var $: any;

@Component({
  selector: "app-edit-flights",
  templateUrl: "./edit-flights.component.html",
  styleUrls: ["./edit-flights.component.css"],
})
export class EditFlightsComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;
  allDestinations;
  allDiscounts;
  allSeatConfigurations;
  allServices: PlaneService[];
  serverAddress = environment.serverAddress;
  //data necessary to create flight
  avioCompany: AirlineCompany;
  flightStops: Destination[] = []; //cekirana presedanja
  servicesToAdd: string = ""; //cekirani servisi
  constructor(
    private destinationsService: DestinationsService,
    private discountsData: DiscountService,
    private seatConfigurationsService: SeatsConfigService,
    private _avioCompanyService: AviocompaniesService,
    private _flightService: FlightsService,
    private _planeServicesService: PlaneServicesService
  ) {}

  ngOnInit(): void {
    this._planeServicesService
      .getAllServices()
      .subscribe((services) => (this.allServices = services as PlaneService[]));

    this.destinationsService.getAll().subscribe((destinations) => {
      this.allDestinations = destinations;
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
      $("#arrivingDate").datepicker({
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

    //
    let servicesIds = [];
    $("input:checkbox[name=services]:checked").each(function () {
      servicesIds.push($(this).val());
    });

    for (let i = 0; i < servicesIds.length; i++) {
      let service = this.allServices.find((d) => d.id == servicesIds[i]);

      if (this.servicesToAdd != "") {
        this.servicesToAdd += "," + service.icon;
      } else {
        this.servicesToAdd += service.icon;
      }
    }

    //TREBA NAPRAVITI SEAT CONFIG GET, GET ALL, PUT metode i izvuci ovde trazenu preko servisa
    let planeTypeName = $("#planeType").val();
    //
    let planeType: SeatConfiguration = this.allSeatConfigurations.find(
      (element) => element.name == planeTypeName
    );

    let disc = +$("#discount").val();
    debugger;

    let flight = new Flight(
      0,
      this.avioCompany,
      $("#startDate").val(),
      $("#arrivingDate").val(),
      $("#startTime").val(),
      $("#arrivingTime").val(),
      $("#distance").val(),
      $("#estimationTime").val(),
      disc,
      planeType,
      this.flightStops,
      this.servicesToAdd,
      $("#price").val(),
      ""
    );
    debugger;
    this._flightService.createFlight(flight).subscribe();
  }
}

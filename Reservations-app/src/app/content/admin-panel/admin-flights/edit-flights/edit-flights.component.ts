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
import { PlaneTypeService } from "src/app/services/plane-type.service";
import { PlaneType } from "src/app/models/PlaneType.model";
import { Seat, Row } from "src/app/models/Seat.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { AvailableService } from "src/app/models/AvailableServices.model";
import { AvailableDestination } from "src/app/models/AvailableDestination.model";

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

  allPlaneTypes;
  allServices: AvailableService[];
  selectedSeats: Seat[];

  currentSeatConfiguration: SeatConfiguration;
  checkedDestinations: Destination[] = [];

  serverAddress = environment.serverAddress;
  //data necessary to create flight
  avioCompany: AirlineCompany;

  servicesToAdd: string = ""; //cekirani servisi
  constructor(
    private destinationsService: DestinationsService,
    private discountsData: DiscountService,
    private planeTypeService: PlaneTypeService,
    private _avioCompanyService: AviocompaniesService,
    private _flightService: FlightsService,
    private _planeServicesService: PlaneServicesService,
    private _selectedSeatsService: SelectedseatsService
  ) {}

  ngOnInit(): void {
    this._selectedSeatsService.selectedSeats.subscribe(
      (selectedSeats) => (this.selectedSeats = selectedSeats as Seat[])
    );

    this._planeServicesService
      .getAllAvailableServices()
      .subscribe(
        (services) =>
          (this.allServices = (services as AvailableService[]).filter(
            (s) => s.status
          ))
      );

    this.destinationsService
      .getAllAvailableDestinations()
      .subscribe((destinations) => {
        this.allDestinations = (destinations as AvailableDestination[]).filter(
          (d) => d.status
        );
      });

    this.discountsData.allDiscounts.subscribe(
      (allDiscounts) => (this.allDiscounts = allDiscounts)
    );

    this.planeTypeService
      .getAllPlaneTypes()
      .subscribe((allPlaneTypes) => (this.allPlaneTypes = allPlaneTypes));

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

  /*Regulisanje redosleda destinacija*/
  destinationClick(destination: Destination) {
    this.checkedDestinations.forEach((d, index) => {
      if (d.id == destination.id) {
        this.checkedDestinations.splice(index, 1);

        return;
      }
    });

    this.checkedDestinations.push(destination);
  }

  /*
  OVDE GLEDAJ
  */
  planeTypeSelected() {
    let key = $("#planeType").val();

    if (key == "*") {
      $("#seatConfigPreview").slideUp(1500);
      return;
    }

    this.planeTypeService.getPlaneType(key).subscribe((planeType) => {
      //kada se ucita trazeni planeType
      let pt: PlaneType = planeType as PlaneType;

      // kreiramo konfiguraciju leta koju cemo dodati u objekat flight i snimiti u bauzu
      this.currentSeatConfiguration = new SeatConfiguration(
        0,
        planeType as PlaneType
      );

      $("#seatConfigPreview").slideDown(750);
    });
  }

  /*
  OVDE GLEDAJ
  */

  createFlight() {
    //pripremamo destinacije jer su izlistane available
    let destinations: Destination[] = [];

    this.checkedDestinations.forEach((d) => {
      destinations.push(
        new Destination(0, d.airportName, d.city, d.country, d.address)
      );
    });

    //pripremamo servise
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

    //pripremamo sedista za brzu rezervaciju
    //s - selected seats
    //r - row
    //a - all seats
    for (let s = 0; s < this.selectedSeats.length; s++) {
      for (let r = 0; r < this.currentSeatConfiguration.seats.length; r++) {
        for (
          let a = 0;
          a < this.currentSeatConfiguration.seats[r].seats.length;
          a++
        ) {
          console.log(r + " - " + a);

          if (
            this.selectedSeats[s].seatNo ==
            this.currentSeatConfiguration.seats[r].seats[a].seatNo
          ) {
            this.currentSeatConfiguration.seats[r].seats[
              a
            ].forFastReservation = true;
          }
        }
      }
    }

    let disc = +$("#discount").val();

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
      this.currentSeatConfiguration,
      destinations,
      this.servicesToAdd,
      $("#price").val(),
      ""
    );

    this._flightService.createFlight(flight).subscribe();
  }
}

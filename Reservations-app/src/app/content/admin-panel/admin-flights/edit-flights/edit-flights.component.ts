import { Component, OnInit } from "@angular/core";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";
import { DiscountService } from "src/app/services/discount.service";
import { SeatsConfigService } from "src/app/services/seats-config.service";

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
  constructor(
    private destinationsService: DestinationsService,
    private discountsData: DiscountService,
    private seatConfigurationsData: SeatsConfigService
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
  }
}

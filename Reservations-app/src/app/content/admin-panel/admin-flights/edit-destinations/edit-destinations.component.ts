import { Component, OnInit } from "@angular/core";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";

@Component({
  selector: "app-edit-destinations",
  templateUrl: "./edit-destinations.component.html",
  styleUrls: ["./edit-destinations.component.css"],
})
export class EditDestinationsComponent implements OnInit {
  public allDestinations;

  airportName = "";
  address = "";
  city = "";
  country = "";

  constructor(public data: DestinationsService) {}
  insertDestination() {
    this.data.addDestination(
      new Destination(
        0,
        this.airportName,
        this.city,
        this.country,
        this.address
      )
    );
  }
  removeDestination(id: number) {
    this.data.removeDestination(id);
  }

  ngOnInit(): void {
    this.data.allDestinations.subscribe(
      (data) => (this.allDestinations = data)
    );
  }
}

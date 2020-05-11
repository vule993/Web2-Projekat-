import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Link } from "src/app/models/Link";

@Component({
  selector: "app-admin-flights",
  templateUrl: "./admin-flights.component.html",
  styleUrls: ["./admin-flights.component.css"],
})
export class AdminFlightsComponent implements OnInit {
  links: Link[] = [];

  constructor() {
    this.links.push(
      new Link(
        "../../assets/site/icons/home-white.png",
        "AVIOCOMPANY PROFILE",
        "/admin/avio/edit-profile"
      )
    );
    this.links.push(
      new Link(
        "../../assets/site/icons/plane-white.png",
        "DESTINATIONS",
        "destinations"
      )
    );
    this.links.push(
      new Link("../../assets/site/icons/car-white.png", "FLIGHTS", "flights")
    );
    this.links.push(
      new Link("../../assets/site/icons/home-white.png", "DISCOUNT", "discount")
    );
    this.links.push(
      new Link(
        "../../assets/site/icons/plane-white.png",
        "SEAT CONFIGURATION",
        "seat-config"
      )
    );
    this.links.push(
      new Link(
        "../../assets/site/icons/car-white.png",
        "BUSINESS REPORT",
        "business-report"
      )
    );
  }

  ngOnInit(): void {}
}

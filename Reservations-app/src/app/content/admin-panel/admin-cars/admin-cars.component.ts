import { Component, OnInit } from "@angular/core";
import { Link } from "src/app/models/Link";

@Component({
  selector: "app-admin-cars",
  templateUrl: "./admin-cars.component.html",
  styleUrls: [
    "../admin-flights/admin-flights.component.css",
    "./admin-cars.component.css",
  ],
})
export class AdminCarsComponent implements OnInit {
  links: Link[] = [];
  constructor() {
    this.links.push(
      new Link(
        "../../assets/site/icons/home-white.png",
        "COMPANY DETAILS",
        "edit-company"
      )
    );
    this.links.push(
      new Link("../../assets/site/icons/car-white.png", "CARS", "cars")
    );

    this.links.push(
      new Link(
        "../../../../assets/site/icons/money-white.png",
        "PRICE LIST",
        "price-list"
      )
    );
    this.links.push(
      new Link(
        "../../../../assets/site/icons/statistics-white.png",
        "STATISTICS",
        "statistics"
      )
    );
  }

  ngOnInit(): void {}
}

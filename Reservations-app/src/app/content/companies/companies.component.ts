import { Component, OnInit } from "@angular/core";
import { Link } from "src/app/models/Link";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  links: Link[] = [];
  constructor() {
    this.links.push(
      new Link(
        "../../assets/site/icons/plane-white.png",
        "AIRLINE COMPANIES",
        "/companies/airlines"
      )
    );
    this.links.push(
      new Link(
        "../../assets/site/icons/car-white.png",
        "RENT A CAR COMPANIES",
        "destinations"
      )
    );
  }

  ngOnInit(): void {}
}

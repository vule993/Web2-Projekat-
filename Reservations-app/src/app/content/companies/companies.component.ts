import { Component, OnInit } from "@angular/core";
import { Link } from "src/app/models/Link";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  links: Link[] = [];
  allAvioCompanies = [];
  //ovde fale sve rent a car kompanije
  constructor(private allAirlineCompaniesData: AviocompaniesService) {
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
        "car-companies"
      )
    );
  }

  ngOnInit(): void {
    this.allAirlineCompaniesData.allAvioCompanies.subscribe(
      (data) => (this.allAvioCompanies = data)
    );
  }
}

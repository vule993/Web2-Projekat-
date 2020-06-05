import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Link } from "src/app/models/Link";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { CarsService } from "src/app/services/cars.service";
import { Router, NavigationStart } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { SelectedcompanyService } from "src/app/services/selectedcompany.service";
import { AvioCompany } from "src/app/models/AvioCompany.model";
import { CarCompany } from "src/app/models/CarCompany.model";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  links: Link[] = [];
  allAvioCompanies: AvioCompany[] = [];
  allRentACarCompanies: CarCompany[] = [];

  //predstavlja ili avio ili rent-a-car
  selectedCompany = new BehaviorSubject("");
  getSelectedCompany = this.selectedCompany.asObservable();
  id: number;
  urlSelector = "";
  //ovde fale sve rent a car kompanije
  constructor(
    private allAirlineCompaniesData: AviocompaniesService,
    private allCarCompaniesData: CarsService,
    private router: Router,
    private selectedCompanyService: SelectedcompanyService
  ) {
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
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.urlSelector = val.url.split("/")[2];
        this.id = +val.url.split("/")[3];

        if (this.urlSelector !== "" && !isNaN(this.id)) {
          let company;
          if (this.urlSelector === "airlines") {
            company = this.allAvioCompanies.find(
              (aviocompany) => aviocompany.id == this.id
            );
          } else if (this.urlSelector === "car-companies") {
            company = this.allRentACarCompanies.find(
              (rentACarCompany) => rentACarCompany.id == this.id
            );
          }
          this.selectedCompanyService.setData(company);
        }
      }
    });

    this.allCarCompaniesData.allCarCompanies.subscribe((data) => {
      this.allRentACarCompanies = data;
    });
    this.allAirlineCompaniesData.allAvioCompanies.subscribe((data) => {
      this.allAvioCompanies = data;
    });
  }
}

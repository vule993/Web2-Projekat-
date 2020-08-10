import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Link } from "src/app/models/Link";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { CarsService } from "src/app/services/cars.service";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { SelectedcompanyService } from "src/app/services/selectedcompany.service";
import { AvioCompany } from "src/app/models/AvioCompany.model";
import { CarCompany } from "src/app/models/CarCompany.model";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"]
})
export class CompaniesComponent implements OnInit {
  links: Link[] = [];
  allAvioCompanies: AvioCompany[] = [];
  allRentACarCompanies: CarCompany[] = [];

  company;
  id: number;
  urlSelector = "";
  //ovde fale sve rent a car kompanije
  constructor(
    private allAirlineCompaniesData: AviocompaniesService,
    private CarCompanyService: CarsService,
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
    this.CarCompanyService.getCarCompanies().subscribe(data => {
      this.allRentACarCompanies = data as CarCompany[];
    });
    this.allAirlineCompaniesData.allAvioCompanies.subscribe(data => {
      this.allAvioCompanies = data;
      //ispravka za refresh stranice
      let id = 1;
      this.company = data.find(company => company.id === id);
      this.selectedCompanyService.setData(this.company);
    });

    this.router.events.subscribe(val => {
      if (val instanceof NavigationStart) {
        this.urlSelector = val.url.split("/")[2];
        this.id = +val.url.split("/")[3];

        if (this.urlSelector !== "" && !isNaN(this.id)) {
          if (this.urlSelector === "airlines") {
            this.company = this.allAvioCompanies.find(
              aviocompany => aviocompany.id == this.id
            );
          } else if (this.urlSelector === "car-companies") {
            this.company = this.allRentACarCompanies.find(
              rentACarCompany => rentACarCompany.id == this.id
            );
          }
          this.selectedCompanyService.setData(this.company);
        }
      }
    });
  }
}

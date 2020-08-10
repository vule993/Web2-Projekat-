import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { AvioCompany } from "src/app/models/AirlineCompany.model";
import { CarCompanyProfileComponent } from "../car-companies/car-company-profile/car-company-profile.component";
import { CarCompany } from "src/app/models/CarCompany.model";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { CarsService } from "src/app/services/cars.service";
@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.css"],
})
export class CompanyListComponent implements OnInit {
  url = window.location.pathname + "/";
  avioCompanies;
  rentACarCompanies;
  constructor(
    private router: Router,
    private avioCompaniesService: AviocompaniesService,
    private rentACarCompaniesService: CarsService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        let urlSegments = val.url.split("/");
        let currentUrl = urlSegments[2];
        this.url = currentUrl + "/";
      }
    });
    this.avioCompaniesService.getAllCompanies().subscribe((data) => {
      this.avioCompanies = data;
    });
    this.rentACarCompaniesService.allCarCompanies.subscribe((data) => {
      this.rentACarCompanies = data;
    });
  }
}

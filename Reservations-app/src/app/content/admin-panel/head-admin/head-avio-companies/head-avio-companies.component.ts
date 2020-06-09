import { Component, OnInit } from "@angular/core";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AvioCompany } from "src/app/models/AvioCompany.model";

@Component({
  selector: "app-head-avio-companies",
  templateUrl: "./head-avio-companies.component.html",
  styleUrls: ["./head-avio-companies.component.css"]
})
export class HeadAvioCompaniesComponent implements OnInit {
  allAvioCompanies: AvioCompany[] = [];

  sliderData = {
    title: "All companies",
    hints: ["Likes", "Address", "Description"],
    values: []
  };

  constructor(private allAirlineCompaniesData: AviocompaniesService) {}

  ngOnInit(): void {
    this.allAirlineCompaniesData.allAvioCompanies.subscribe(data => {
      this.allAvioCompanies = data;
      this.sliderData.values = [];
      this.allAvioCompanies.forEach(company => {
        this.sliderData.values.push({
          v0: company.getId(),
          v1: company.getName(), //reserved for card title
          v2: company.getLikes(),
          v3: company.getAddress(),
          v4: company.getDescription()
        });
      });
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { Address } from "src/app/models/address.model";
import { Destination } from "src/app/models/Destination.model";
import { AirlineCompanyProfileComponent } from "src/app/content/companies/airlines/airline-company-profile/airline-company-profile.component";

@Component({
  selector: "app-edit-avio-profile",
  templateUrl: "./edit-avio-profile.component.html",
  styleUrls: ["./edit-avio-profile.component.css"],
})
export class EditAvioProfileComponent implements OnInit {
  company: AirlineCompany;
  constructor(private _avioCompanyService: AviocompaniesService) {
    this._avioCompanyService.getCompany("1").subscribe((company) => {
      this.company = company as AirlineCompany;
    });
  }

  ngOnInit(): void {}
}

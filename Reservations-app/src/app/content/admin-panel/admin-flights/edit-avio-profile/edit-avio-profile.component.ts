import { Component, OnInit } from "@angular/core";
import { AvioCompany } from "src/app/models/AvioCompany.model";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { Address } from "src/app/models/address.model";
import { Destination } from "src/app/models/Destination.model";

@Component({
  selector: "app-edit-avio-profile",
  templateUrl: "./edit-avio-profile.component.html",
  styleUrls: ["./edit-avio-profile.component.css"],
})
export class EditAvioProfileComponent implements OnInit {
  company: AvioCompany;
  constructor(private _avioCompanyService: AviocompaniesService) {
    this._avioCompanyService.getCompany("1").subscribe((company) => {
      this.company = company as AvioCompany;
    });
  }

  ngOnInit(): void {}
}

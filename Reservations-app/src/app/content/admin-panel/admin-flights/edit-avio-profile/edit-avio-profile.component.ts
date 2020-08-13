import { Component, OnInit } from "@angular/core";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { Address } from "src/app/models/address.model";
import { Destination } from "src/app/models/Destination.model";
import { AirlineCompanyProfileComponent } from "src/app/content/companies/airlines/airline-company-profile/airline-company-profile.component";

declare var $: any;

@Component({
  selector: "app-edit-avio-profile",
  templateUrl: "./edit-avio-profile.component.html",
  styleUrls: ["./edit-avio-profile.component.css"],
})
export class EditAvioProfileComponent implements OnInit {
  company: AirlineCompany;
  constructor(private _avioCompanyService: AviocompaniesService) {}

  saveInfo() {
    let company = new AirlineCompany(
      this.company.id,
      $("#companyName").val(),
      new Address($("#country").val(), $("#city").val(), $("#street").val()),
      $("#description").val(),
      [],
      [],
      [],
      -1,
      ""
    );

    this._avioCompanyService.updateCompany(company).subscribe();
  }

  ngOnInit(): void {
    this._avioCompanyService
      .getCompany(localStorage.getItem("email"))
      .subscribe((company) => {
        this.company = company as AirlineCompany;
      });
  }
}

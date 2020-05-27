import { Component, OnInit } from "@angular/core";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AvioCompany } from "src/app/models/AvioCompany.model";

declare var $: any;
@Component({
  selector: "app-airlines",
  templateUrl: "./airlines.component.html",
  styleUrls: ["./airlines.component.css"],
})
export class AirlinesComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;
  allAvioCompanies: AvioCompany[] = [];

  sliderData = {
    title: "Aviocompanies asd",
    hints: ["Likes", "Address", "Description"],
    values: [],
  };

  constructor(private allAirlineCompaniesData: AviocompaniesService) {}

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }
  ngOnInit(): void {
    this.allAirlineCompaniesData.allAvioCompanies.subscribe((data) => {
      this.allAvioCompanies = data;
      this.sliderData.values = [];
      this.allAvioCompanies.forEach((company) => {
        this.sliderData.values.push({
          v0: company.getId(),
          v1: company.getName(), //reserved for card title
          v2: company.getLikes(),
          v3: company.getAddress(),
          v4: company.getDescription(),
        });
      });
    });

    this.departCalendar = $(function () {
      $("#departTime").datepicker({
        // format: "yyyy-mm-dd",
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });

    this.returnCalendar = $(function () {
      $("#returnTime").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });
  }
}

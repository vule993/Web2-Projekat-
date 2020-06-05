import { Component, OnInit } from "@angular/core";
import { SelectedcompanyService } from "src/app/services/selectedcompany.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-airline-company-profile",
  templateUrl: "./airline-company-profile.component.html",
  styleUrls: ["./airline-company-profile.component.css"],
})
export class AirlineCompanyProfileComponent implements OnInit {
  currentCompany;
  selectedValue;
  iframeSrc = "";
  constructor(
    private route: ActivatedRoute,
    private selectedcompanyService: SelectedcompanyService
  ) {}

  ngOnInit(): void {
    this.selectedcompanyService.currentCompany.subscribe(
      (company) => (this.currentCompany = company)
    );
  }
  countStar(star) {
    this.selectedValue = star;
    console.log("Value of star", star);
    this.currentCompany.rating = star; //nece ovako moci
  }

  createURL() {
    this.iframeSrc = `https://maps.google.com/maps?q=${this.currentCompany.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    return this.iframeSrc;
  }
}

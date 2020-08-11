import { Component, OnInit } from "@angular/core";
import { CarsService } from "src/app/services/cars.service";
import { CarCompany } from "src/app/models/CarCompany.model";

@Component({
  selector: "app-head-car-companies",
  templateUrl: "./head-car-companies.component.html",
  styleUrls: ["./head-car-companies.component.css"]
})
export class HeadCarCompaniesComponent implements OnInit {
  carCompanies: CarCompany[];

  sliderData = {
    title: "All companies",
    hints: ["About", "Address", "Rating"],
    values: []
  };

  constructor(private carService: CarsService) {}

  ngOnInit(): void {
    this.carService.getCarCompanies().subscribe(data => {
      this.carCompanies = data as CarCompany[];
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name,
          v2: company.address + ", " + company.city,
          v3: company.rating
        });
      });
    });
  }
}

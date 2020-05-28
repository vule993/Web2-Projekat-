import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";

@Component({
  selector: "app-car-companies",
  templateUrl: "./car-companies.component.html",
  styleUrls: ["./car-companies.component.css"]
})
export class CarCompaniesComponent implements OnInit {
  carCompanies: CarCompany[];
  sliderData = {
    title: "All companies",
    hints: ["About", "Address", "Rating"],
    values: []
  };

  constructor(private carService: CarsService) {}

  ngOnInit(): void {
    this.carService.allCarCompanies.subscribe(data => {
      this.carCompanies = data;
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        this.sliderData.values.push({
          v0: company.getId(),
          v1: company.getName(),
          v2: company.description,
          v3: company.getAddress(),
          v4: company.getRating()
        });
      });
    });
  }
}

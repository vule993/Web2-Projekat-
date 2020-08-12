import { Component, OnInit } from "@angular/core";
import { CarsService } from "src/app/services/cars.service";
import { CarCompany } from "src/app/models/CarCompany.model";
import { Address } from "src/app/models/address.model";

@Component({
  selector: "app-head-car-companies",
  templateUrl: "./head-car-companies.component.html",
  styleUrls: ["./head-car-companies.component.css"]
})
export class HeadCarCompaniesComponent implements OnInit {
  carCompanies: CarCompany[];

  sliderData = {
    title: "All companies",
    hints: ["Rating", "Address", "About"],
    values: []
  };

  constructor(private carService: CarsService) {}

  ngOnInit(): void {
    this.carService.getCarCompanies().subscribe(data => {
      this.carCompanies = data as CarCompany[];
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        let address = new Address("", company.city, company.address);
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name,
          v2: company.rating,
          v3: address,
          v4: company.description
        });
      });
    });
  }
}

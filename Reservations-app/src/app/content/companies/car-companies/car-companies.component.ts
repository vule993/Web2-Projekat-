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

  constructor(private carService: CarsService) {
    this.carCompanies = carService.getCarCompanies();
  }

  ngOnInit(): void {}
}

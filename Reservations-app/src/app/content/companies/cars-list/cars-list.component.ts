import { Component, OnInit } from "@angular/core";
import { owlCarousel } from "../../../../assets/js/owl.carousel.js";
import { CarCompany } from "src/app/models/CarCompany.model.js";
import { CarsService } from "src/app/services/cars.service.js";
declare var $: any;

@Component({
  selector: "app-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.css"]
})
export class CarsListComponent implements OnInit {
  companies: CarCompany[];

  constructor(private carService: CarsService) {
    this.companies = carService.getCarCompanies();
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-car-company-profile",
  templateUrl: "./car-company-profile.component.html",
  styleUrls: [
    "./car-company-profile.component.css",
    "../../../profile/profile.component.css"
  ]
})
export class CarCompanyProfileComponent implements OnInit {
  carCompany: CarCompany;
  id: number;

  constructor(private carService: CarsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //fetch id of car component, id is index in the list
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.carCompany = this.carService.getCarCompany(this.id);
    });
  }
}

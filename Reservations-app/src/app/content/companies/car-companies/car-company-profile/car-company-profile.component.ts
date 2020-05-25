import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

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
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  iframeSrc: string;

  constructor(private carService: CarsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("renderr");
    //fetch id of car component, id is index in the list
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];

      this.carCompany = this.carService.getCarCompany(this.id);
    });
  }

  countStar(star) {
    this.selectedValue = star;
    console.log("Value of star", star);
    this.carCompany.rating = star; //nece ovako moci
  }

  createURL() {
    this.iframeSrc = `https://maps.google.com/maps?q=${this.carCompany.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    return this.iframeSrc;
  }
}

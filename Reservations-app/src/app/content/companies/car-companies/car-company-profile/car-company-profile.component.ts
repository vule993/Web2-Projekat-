import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Car } from "src/app/models/car.model";

@Component({
  selector: "app-car-company-profile",
  templateUrl: "./car-company-profile.component.html",
  styleUrls: [
    "./car-company-profile.component.css"
    // "../../profile/profile.component.css",
  ]
})
export class CarCompanyProfileComponent implements OnInit {
  carCompany: CarCompany;
  availableCars: Car[] = new Array<Car>();
  id: number;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  iframeSrc: string;
  isLoaded: boolean = false;

  constructor(private carService: CarsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //fetch id of car company
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];

      this.carService.fetchCarCompany(this.id).subscribe(data => {
        this.carCompany = data as CarCompany;
        //load available cars
        this.carService.getCarsOfCompany(this.id).subscribe(data => {
          this.availableCars = (data as Car[]).filter(
            x => x.isReserved === false
          );
        });
        this.isLoaded = true;
      });
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

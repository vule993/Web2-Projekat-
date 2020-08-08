import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.component.html",
  styleUrls: ["./add-car.component.css"]
})
export class AddCarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //ovde ce se pozivati metoda addCarToCompany() iz adminService-a
}

import { Component, OnInit } from "@angular/core";
import { CarsService } from "src/app/services/cars.service";
import { Car } from "src/app/models/car.model";

@Component({
  selector: "app-edit-car-list",
  templateUrl: "./edit-car-list.component.html",
  styleUrls: ["./edit-car-list.component.css"]
})
export class EditCarListComponent implements OnInit {
  carToEdit: Car;
  newCar: Car;

  companyCars: Car[] = [
    {
      id: 1,
      description:
        "100kW (136KS), Manuelni 6 brzina, Automatska klima, 4/5 vrata, 5 sedišta",
      mark: "AUDI A6",
      year: 2009,
      seats: 5,
      price: 8500,
      rating: 4.2,
      image: "",
      category: "basic",
      isReserved: false
    },
    {
      id: 2,
      description:
        "Polovno vozilo Opel Insignia 2018. godište 80.963 km Limuzina Dizel 1598 cm3",
      mark: "Opel",
      year: 2018,
      seats: 5,
      price: 10000,
      rating: 4.6,
      image: "",
      category: "basic",
      isReserved: false
    }
  ];

  constructor() {
    this.carToEdit = new Car(-1, "", "", 0, 0, 0, 0, "", "", false);
    this.newCar = new Car(-1, "", "", 0, 0, 0, 0, "", "", false);
  }

  ngOnInit(): void {}

  /*****Methods*****/

  //ovde ce se pozivati metoda addCarToCompany() iz adminService-a

  AddCarModal() {}

  AddNewCar() {}

  editCarModal(car: Car): void {
    this.carToEdit = car;
  }

  updateCar() {
    let mark = (<HTMLInputElement>document.getElementById("mark")).value;
    let description = (<HTMLInputElement>document.getElementById("desc")).value;
    let year = (<HTMLInputElement>document.getElementById("year")).value;

    let index = this.companyCars.indexOf(this.carToEdit);
    this.companyCars[index].mark = mark;
    this.companyCars[index].description = description;
    this.companyCars[index].year = +year;
  }

  deleteCar() {
    this.companyCars.splice(this.companyCars.indexOf(this.carToEdit));
  }
}

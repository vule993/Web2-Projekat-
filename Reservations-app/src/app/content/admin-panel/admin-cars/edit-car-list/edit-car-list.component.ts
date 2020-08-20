import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/models/car.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CarCompany } from "src/app/models/CarCompany.model";
import { AdminService } from "src/app/services/admin.service";
import { CarsService } from "src/app/services/cars.service";

@Component({
  selector: "app-edit-car-list",
  templateUrl: "./edit-car-list.component.html",
  styleUrls: ["./edit-car-list.component.css"]
})
export class EditCarListComponent implements OnInit {
  carToEdit: Car;
  newCar: Car;
  addCarForm: FormGroup;
  selectedOption: string;
  companyId: number = -1;

  companyCars: Car[] = [];

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private carService: CarsService
  ) {
    this.carToEdit = new Car("", "", 0, 0, 0, 0, "", "", false);
    this.newCar = new Car("", "", 0, 0, 0, 0, "", "", false);
  }

  ngOnInit(): void {
    this.adminService
      .getAdminCarCompany(localStorage.getItem("userId"))
      .subscribe(data => {
        this.companyId = (data as CarCompany).id;

        this.adminService.getCarsOfCompany(this.companyId).subscribe(data => {
          this.companyCars = data as Car[];
        });
      });

    this.initForm();
  }

  /*****Methods*****/

  AddCarModal() {}

  AddNewCar() {
    let car = new Car(
      this.addCarForm.value["description"],
      this.addCarForm.value["mark"],
      +this.addCarForm.value["year"],
      +this.addCarForm.value["seats"],
      +this.addCarForm.value["price"],
      0,
      "",
      this.addCarForm.value["category"],
      false
    );

    this.companyCars.push(car);

    this.adminService.addCarToCompany(car, this.companyId).subscribe(
      (res: any) => {
        this.addCarForm.reset();
        this.toastrService.success("Successfully added new car", "Car added");
      },
      err => {
        this.toastrService.error("Error while adding a car", "Car not added");
      }
    );
  }

  editCarModal(car: Car): void {
    this.carToEdit = car;
  }

  updateCar() {
    this.carToEdit.mark = (<HTMLInputElement>(
      document.getElementById("mark")
    )).value;
    this.carToEdit.description = (<HTMLInputElement>(
      document.getElementById("desc")
    )).value;
    this.carToEdit.year = +(<HTMLInputElement>document.getElementById("year"))
      .value;
    this.carToEdit.price = +(<HTMLInputElement>document.getElementById("price"))
      .value;
    this.carToEdit.category = (<HTMLInputElement>(
      document.getElementById("category")
    )).value;

    this.carService.updateCar(this.carToEdit).subscribe(
      res => {
        this.toastrService.success(
          "You updated a car.",
          "Car succesfully updated"
        );
      },
      err => {
        this.toastrService.error(
          "Error while updating a car",
          "Car not updated"
        );
      }
    );
  }

  deleteCar(id: number) {
    //TODO: Uvesti da ne moze da obrise auto koji je trenutno rezervisan
    this.carService.deleteCar(id).subscribe(
      res => {
        this.toastrService.success("You deleted this car.", "Car deleted");
      },
      err => {
        this.toastrService.error(
          "Error while deleting a car.",
          "Car not deleted"
        );
      }
    );
    //this.companyCars.splice(this.companyCars.indexOf(this.carToEdit));
  }

  private initForm() {
    let mark = "";
    let description = "";
    let year = "";
    let seats = "";
    let price = "";
    let category = "";

    this.addCarForm = new FormGroup({
      mark: new FormControl(mark, Validators.required),
      description: new FormControl(description, Validators.required),
      year: new FormControl(year, Validators.required),
      seats: new FormControl(seats, Validators.required),
      price: new FormControl(price, Validators.required),
      category: new FormControl(category, Validators.required)
    });
  }
}

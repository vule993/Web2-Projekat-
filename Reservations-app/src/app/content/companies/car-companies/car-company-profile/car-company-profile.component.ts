import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Car } from "src/app/models/car.model";
import { CarReservation } from "src/app/models/CarReservation";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-car-company-profile",
  templateUrl: "./car-company-profile.component.html",
  styleUrls: [
    "./car-company-profile.component.css"
  ]
})
export class CarCompanyProfileComponent implements OnInit {
  carCompany: CarCompany;
  availableCars: Car[] = new Array<Car>();
  companyId: number;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  iframeSrc: string;
  isLoaded: boolean = false;
  selectedCar: Car;
  quickReservationForm: FormGroup;

  constructor(private carService: CarsService, private route: ActivatedRoute, private toastrService: ToastrService) {}

  ngOnInit(): void {
    //fetch id of car company
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params["id"];

      this.carService.fetchCarCompany(this.companyId).subscribe(data => {
        this.carCompany = data as CarCompany;
        //load available cars
        this.carService.getCarsOfCompany(this.companyId).subscribe(data => {
          this.availableCars = (data as Car[]).filter(
            x => x.isReserved === false
          );
        });
        this.isLoaded = true;
      });
    });

    this.initForm();
  }

  QuickReservationModal(car: Car) {
    this.selectedCar = car;
  }

  MakeQuickReservation() {
    //TODO: price * razlika dana izmedju endDate i startDate-a
    let startDate = this.quickReservationForm.value["startDate"];
    let endDate = this.quickReservationForm.value["endDate"];
    let reservation = new CarReservation(
      this.selectedCar,
      this.carCompany,
      startDate,
      endDate,
      this.selectedCar.price,
      localStorage.getItem("userId")
    );

    this.carService.makeReservation(reservation).subscribe(
      (res) => {
        this.toastrService.success("You made a quick reservation!", "Car rented");
      },
      err => {
        this.toastrService.error("Error while making a quick reservation", "Error");
      }
    )
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

  initForm() {
    let startDate = null;
    let endDate = null;

    this.quickReservationForm = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required)
    });
  }
}

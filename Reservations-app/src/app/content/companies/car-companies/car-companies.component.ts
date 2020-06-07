import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";

declare var $: any;
@Component({
  selector: "app-car-companies",
  templateUrl: "./car-companies.component.html",
  styleUrls: [
    "./car-companies.component.css",
    "../airlines/airlines.component.css"
  ]
})
export class CarCompaniesComponent implements OnInit {
  carCompanies: CarCompany[];
  startCalendar: any;
  allReservations: Reservation[];

  sliderData = {
    title: "All companies",
    hints: ["About", "Address", "Rating"],
    values: []
  };

  constructor(
    private carService: CarsService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    //load reservations
    this.reservationService.allReservations.subscribe(
      data => (this.allReservations = data)
    );

    this.carService.allCarCompanies.subscribe(data => {
      this.carCompanies = data;
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        this.sliderData.values.push({
          v0: company.getId(),
          v1: company.getName(),
          v2: company.description,
          v3: company.getAddress(),
          v4: company.getRating()
        });
      });
    });

    this.startCalendar = $(function() {
      $("#startDate").datepicker({
        // format: "yyyy-mm-dd",
        format: "dd-MM-yyyy",
        autoclose: true
      });
    });
  }

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }
}

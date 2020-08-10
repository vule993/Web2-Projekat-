import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";
import { Car } from "src/app/models/car.model";

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
  endCalendar: any;
  allReservations: Reservation[];
  allCars: Car[];
  allReservationsToShow: Reservation[];
  allReservationsPreFilter: Reservation[];

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

    //load cars
    this.allCars = this.carService.getCars();

    this.carService.getCarCompanies().subscribe(data => {
      this.carCompanies = data as CarCompany[];
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        console.log(
          company.address +
            ", " +
            company.city +
            "i rating je: " +
            company.rating
        );
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name,
          v2: company.address + ", " + company.city,
          v3: company.rating
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
    this.endCalendar = $(function() {
      $("#endDate").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true
      });
    });
  }

  searchReservations() {
    this.allReservationsToShow = this.allReservations;
    console.log(this.allReservationsToShow.length);

    if ($("#cars").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation => reservation.carReservation.car.mark == $("#cars").val()
      );
    }

    if ($("#startDate").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation =>
          new Date(reservation.carReservation.startDate) >=
          new Date($("#startDate").val())
      );
    }

    if ($("#endDate").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation =>
          new Date(reservation.carReservation.endDate) >=
          new Date($("#endDate").val())
      );
    }

    console.log(this.allReservationsToShow);

    this.allReservationsPreFilter = this.allReservationsToShow;
  }

  //filter
  filterReservations() {
    this.allReservationsToShow = this.allReservationsPreFilter;

    if ($("#company").val() != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation =>
          reservation.carReservation.carCompany.name === $("#company").val()
      );
    }

    if ($("#category").val != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation =>
          reservation.carReservation.car.category === $("#category").val()
      );
    }
  }

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }
}

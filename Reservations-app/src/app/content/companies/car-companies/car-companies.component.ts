import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { ReservationService } from "src/app/services/reservation.service";
import { Reservation } from "src/app/models/Reservation.model";
import { Car } from "src/app/models/car.model";
import { Address } from "src/app/models/address.model";
import { CarReservation } from "src/app/models/CarReservation";
import { CarOffer } from "src/app/models/carOffer.model";

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
  allCarsToShow: Car[];
  allCarsPreFilter: Car[];
  resultsLoaded: boolean = false;

  sliderData = {
    title: "All companies",
    hints: ["Rating", "Address", "About"],
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

    if (this.allReservations.length > 0) this.resultsLoaded = true;

    //load cars
    this.carService.fetchCars().subscribe(data => {
      this.allCarsToShow = data as Car[];
      this.allCarsPreFilter = data as Car[];
    });

    //load car companies
    this.carService.getCarCompanies().subscribe(data => {
      this.carCompanies = data as CarCompany[];
      this.sliderData.values = [];
      this.carCompanies.forEach(company => {
        let address = new Address("", company.city, company.address);
        this.sliderData.values.push({
          v0: company.id,
          v1: company.name,
          v2: company.rating,
          v3: address,
          v4: company.description
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

  getCompanyId(carId: number) {}

  /* searchReservations() {
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
  } */

  //filter
  filterReservations() {
    this.allCarsToShow = this.allCarsPreFilter;

    if ($("#category").val() != "") {
      let category = $("#category").val();
      this.allCarsToShow = this.allCarsToShow.filter(
        car => car.category.toLowerCase() == category
      );
    }
    /* if ($("#category").val != "") {
      this.allReservationsToShow = this.allReservationsToShow.filter(
        reservation =>
          reservation.carReservation.car.category === $("#category").val()
      );
    } */
  }
}

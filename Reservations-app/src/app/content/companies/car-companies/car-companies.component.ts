import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { CarsService } from "src/app/services/cars.service";
import { Car } from "src/app/models/car.model";
import { Address } from "src/app/models/address.model";
import { CarOffer } from "src/app/models/carOffer.model";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CarReservation } from "src/app/models/CarReservation";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";

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
  carCompany: CarCompany;

  allCarsToShow: Car[];
  carOffers: CarOffer[] = [];
  carOffersPreFilter: CarOffer[] = [];
  selectedOffer: CarOffer;
  //resultsLoaded: boolean = false;
  CarReservationForm: FormGroup;
  fullPrice: number;

  sliderData = {
    title: "All companies",
    hints: ["Rating", "Address", "About"],
    values: []
  };

  constructor(
    private carService: CarsService,
    private router: Router,
    private toastrService: ToastrService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    //load cars
    this.carService.fetchCars().subscribe(data => {
      this.allCarsToShow = (data as Car[]).filter(c => !c.isReserved);

      this.allCarsToShow.forEach(c => {
        this.carService.fetchCarCompanyByCarId(c.id).subscribe(company => {
          this.carCompany = company as CarCompany;

          let carOffer = new CarOffer(c.description, c, this.carCompany, c.id);
          this.carOffers.push(carOffer);
          this.carOffersPreFilter.push(carOffer);
          //this.resultsLoaded = true;
          console.log(this.carOffers);
        });
      });
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

    this.initForm();
  }

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
    //this.allCarsToShow = this.allCarsPreFilter;
    this.carOffers = this.carOffersPreFilter;
    let category = $("#category")
      .val()
      .toLowerCase();
    let companyName = $("#company")
      .val()
      .toLowerCase();
    let numOfSeats = $("#seats")
      .val()
      .toLowerCase();
    let carMark = $("#carMark")
      .val()
      .toLowerCase();

    //category
    if (category !== "category") {
      this.carOffers = this.carOffers.filter(
        offer => offer.car.category.toLowerCase() === category
      );
    }

    //company name
    if (companyName !== "company") {
      this.carOffers = this.carOffers.filter(
        offer => offer.carCompany.name.toLowerCase() === companyName
      );
    }

    //car Mark
    if (carMark !== "mark") {
      this.carOffers = this.carOffers.filter(
        offer => offer.car.mark.toLocaleLowerCase() === carMark
      );
    }

    //seats
    if (numOfSeats !== "") {
      let numberOfSeats = +numOfSeats;

      if (numberOfSeats <= 1) {
        this.toastrService.warning(
          "Sorry, number of seats can't be less than 2!",
          "Number of seats"
        );
      }

      this.carOffers = this.carOffers.filter(
        offer => offer.car.seats === numberOfSeats
      );
    }
  }

  removeFilters() {
    this.carOffers = this.carOffersPreFilter;
    $("#category").val("category");
    $("#company").val("company");
    $("#seats").val("");
    $("#carMark").val("mark");
  }

  /*Car Reservation */
  CarReservationModal = (offer: CarOffer) => (this.selectedOffer = offer);

  CheckOut() {
    let startDate = this.CarReservationForm.value["startDate"];
    let endDate = this.CarReservationForm.value["endDate"];

    this.fullPrice =
      this.selectedOffer.car.price * this.calcuatePrice(endDate, startDate);
  }

  MakeCarReservation() {
    let startDate = this.CarReservationForm.value["startDate"];
    let endDate = this.CarReservationForm.value["endDate"];

    let carReservation = new CarReservation(
      this.selectedOffer.car,
      this.selectedOffer.carCompany,
      startDate,
      endDate,
      this.selectedOffer.car.id,
      this.fullPrice,
      localStorage.getItem("userId")
    );

    let reservation = new Reservation(0, null, carReservation, false, false);

    this.reservationService.createReservation(reservation).subscribe(
      res => {
        this.toastrService.success("You made a car reservation!", "Car rented");
        this.carOffers.splice(this.carOffers.indexOf(this.selectedOffer));
      },
      err => {
        this.toastrService.error("Error while making a reservation", "Error");
      }
    );

    /* this.carService.makeReservation(reservation).subscribe(
      res => {
        this.toastrService.success("You made a car reservation!", "Car rented");
        this.carOffers.splice(this.carOffers.indexOf(this.selectedOffer)); //proveriti ovo jos
        //redirectovati na companies?
        //this.router.navigate(["companies"]);
      },
      err => {
        this.toastrService.error("Error while making a reservation", "Error");
      }
    ); */
  }

  //help function for calculating fullPrice
  calcuatePrice(date1: Date, date2: Date) {
    let oneDay = 1000 * 60 * 60 * 24;
    let difference = Math.abs(
      new Date(date1).getTime() - new Date(date2).getTime()
    );

    return Math.round(difference / oneDay);
  }

  initForm() {
    let startDate = null;
    let endDate = null;

    this.CarReservationForm = new FormGroup({
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate, Validators.required)
    });
  }
}

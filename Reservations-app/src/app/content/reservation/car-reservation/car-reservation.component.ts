import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Reservation } from "src/app/models/Reservation.model";
import { CarReservation } from "src/app/models/CarReservation";
import { CarOffer } from "src/app/models/carOffer.model";
import { CarsService } from "src/app/services/cars.service";
import { Car } from "src/app/models/car.model";
import { CarCompany } from "src/app/models/CarCompany.model";

@Component({
  selector: "app-car-reservation",
  templateUrl: "./car-reservation.component.html",
  styleUrls: ["./car-reservation.component.css"]
})
export class CarReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  //@Input() carOffers: CarOffer[];
  carReservation: Reservation;
  allCarsToShow: Car[] = [];
  carOffers: CarOffer[] = [];
  carCompany: CarCompany;

  constructor(private carService: CarsService, private routes: Router) {}

  /*KADA JE REZERVACIJA NA PROFILU PROMENJENA U FLIGHT*/
  ngOnInit(): void {
    // this.reservationService.allReservations.subscribe((data) => {
    //   let id = +this.routes.url.split("/")[2];
    //   this.carReservation = data.find((reservation) => reservation.id == id);
    // });
    this.prepareCars();
  }

  prepareCars() {
    //promeniti logiku, uzeti kompaniju na toj lokaciji gde user putuje i onda izlistati auta od te kompanije???
    this.carService.fetchCars().subscribe(data => {
      this.allCarsToShow = (data as Car[]).filter(c => !c.isReserved);

      this.carOffers = [];

      this.allCarsToShow.forEach(c => {
        this.carService.fetchCarCompanyByCarId(c.id).subscribe(company => {
          this.carCompany = company as CarCompany;

          let carOffer = new CarOffer(c.description, c, this.carCompany, c.id);
          this.carOffers.push(carOffer);
        });
      });
    });
  }
}

import { Injectable } from "@angular/core";
import { Reservation } from "../models/Reservation.model";
import { AirlineReservation } from "../models/AirlineReservation";
import { Flight } from "../models/Flight.model";
import { AirlineCompany } from "../models/AirlineCompany.model";
import { Destination } from "../models/Destination.model";
import { CarReservation } from "../models/CarReservation";
import { UserModel } from "../models/User.model";
import { Address } from "../models/address.model";
import { BehaviorSubject } from "rxjs";
import { CarsService } from "./cars.service";
import { SeatConfiguration } from "../models/Seat-configuration.model";
import { S_IFDIR } from "constants";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private _allReservations = new BehaviorSubject<Reservation[]>([
    new Reservation(
      1,
      new AirlineReservation(
        1,
        new Flight(
          1,
          new AirlineCompany(
            null,
            "Air Serbia",
            new Address("Serbia", "Belgrade", "Ljubinke Bobic 11/3"),
            "Opis neki",
            [],
            [],
            //[],
            [],
            132,
            ""
          ),

          "06-June-2020",
          "09-June-2020",
          "10:00",
          "20:00",
          "305km",
          "2h:30min",
          10,
          //ovde treba popnuniti seats u zavisnosti od ovih brojeva
          new SeatConfiguration(1, "Boeing 747", 10, 3, 2, 3, 2, 0, []),
          [
            new Destination(
              1,
              "Nikola Tesla",
              "Belgrade",
              "Serbia",
              "Neznanog junaka jebem li ga 1/1"
            ),
          ],
          "wc,tv,wifi,power supply,newspapers,bar",
          "300",
          "2"
        )
      ),
      new CarReservation(
        1,
        this.carService.getCar(1),
        this.carService.getCarCompany(1),
        "01-Jun-2020",
        "25-Jul-2020",
        this.carService.getPrice(
          this.carService.getCar(2).category,
          this.calculateNumOfDays(
            this.parseDate("02-07-2020"),
            this.parseDate("25-07-2020")
          )
        )
      ),
      false,
      false
    ),
    new Reservation(
      2,
      new AirlineReservation(
        2,
        new Flight(
          2,
          new AirlineCompany(
            null,
            "Air Serbia",
            new Address("Serbia", "Belgrade", "Ljubinke Bobic 11/3"),
            "Opis neki",
            [],
            [],
            //[],
            [],
            132,
            ""
          ),

          "09-June-2020",
          "12-June-2020",
          "15:00",
          "07:30",
          "808km",
          "0h:30min",
          15,
          new SeatConfiguration(1, "Concord", 10, 4, 2, 3, 3, 2, []),
          [
            new Destination(
              1,
              "Neki aerodrom",
              "Negde tamo",
              "Nedodjija",
              "Neznanog junaka jebem li ga 1/1"
            ),
          ],
          "coffee service, wifi, NESTO NOVO...",
          "500",
          "3.4"
        )
      ),
      new CarReservation(
        2,
        this.carService.getCar(2),
        this.carService.getCarCompany(2),
        "05-Aug-2020",
        "23-Aug-2020",
        this.carService.getPrice(
          this.carService.getCar(2).category,
          this.calculateNumOfDays(
            this.parseDate("05-08-2020"),
            this.parseDate("23-08-2020")
          )
        )
      ),
      false,
      false
    ),
  ]);
  allReservations = this._allReservations.asObservable();

  carReservations: CarReservation[] = [
    new CarReservation(
      1,
      this.carService.getCar(1),
      this.carService.getCarCompany(1),
      "01-Jun-2020",
      "25-Jul-2020",
      this.carService.getPrice(
        this.carService.getCar(2).category,
        this.calculateNumOfDays(
          this.parseDate("02-07-2020"),
          this.parseDate("25-07-2020")
        )
      )
    ),
    new CarReservation(
      2,
      this.carService.getCar(1),
      this.carService.getCarCompany(1),
      "03-Jun-2020",
      "25-Jul-2020",
      this.carService.getPrice(
        this.carService.getCar(2).category,
        this.calculateNumOfDays(
          this.parseDate("02-07-2020"),
          this.parseDate("25-07-2020")
        )
      )
    ),
    new CarReservation(
      2,
      this.carService.getCar(2),
      this.carService.getCarCompany(2),
      "05-Aug-2020",
      "23-Aug-2020",
      this.carService.getPrice(
        this.carService.getCar(2).category,
        this.calculateNumOfDays(
          this.parseDate("05-08-2020"),
          this.parseDate("23-08-2020")
        )
      )
    ),
  ];

  constructor(private carService: CarsService) {}

  loadAllReservations() {
    return this.allReservations;
  }
  addReservation(reservation: Reservation) {
    this._allReservations.getValue().push(reservation);
  }
  removeReservation(id: number) {
    this._allReservations.getValue().forEach((reservation, index) => {
      if (reservation.id === id) {
        this._allReservations.getValue().splice(index, 1);
      }
    });
  }
  getSpecificReservation(id: number) {
    return this.carReservations.find((c) => c.id == id);
  }
  getNumberOfReservations() {
    return this._allReservations.getValue().length;
  }

  calculateNumOfDays(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  parseDate(str) {
    var mdy = str.split("-");
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
  }
}

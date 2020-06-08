import { Injectable } from "@angular/core";
import { Reservation } from "../models/Reservation.model";
import { AirlineReservation } from "../models/AirlineReservation";
import { Flight } from "../models/Flight.model";
import { AvioCompany } from "../models/AvioCompany.model";
import { Destination } from "../models/Destination.model";
import { CarReservation } from "../models/CarReservation";
import { User } from "../models/User.model";
import { Address } from "../models/address.model";
import { BehaviorSubject } from "rxjs";
import { DestinationsService } from "./destinations.service";
import { CarsService } from "./cars.service";

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
          new AvioCompany(
            "Air Serbia",
            new Address("Serbia", "Belgrade", "Ljubinke Bobic 11/3"),
            "Opis neki",
            [],
            [],
            [],
            [],
            132,
            1
          ),
          new Destination(
            1,
            "Nikola Tesla",
            "Belgrade",
            "Serbia",
            "Neznanog junaka jebem li ga 1/1"
          ),
          new Destination(
            2,
            "Heathrow",
            "London",
            "UK",
            "Some bloody address 1/1"
          ),
          "06-June-2020",
          "09-June-2020",
          "10:00",
          "20:00",
          "2h:30min",
          "10",
          "Boeing 747",
          [
            new Destination(
              1,
              "Nikola Tesla",
              "Belgrade",
              "Serbia",
              "Neznanog junaka jebem li ga 1/1"
            ),
          ],
          "coffee service, wifi...",
          "300"
        ),
        [
          new User(
            1,
            "Testoje",
            "Testivojevic",
            "testoje@gmail.com",
            "a",
            "",
            "Belgreade",
            "065555333",
            "1"
          ),
        ]
      ),
      new CarReservation(
        1,
        this.carService.getCar(1),
        this.carService.getCarCompany(1),
        "02-Jul-2020",
        "25-Jul-2020",
        this.carService.getPrice(
          this.carService.getCar(2).plan,
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
          new AvioCompany(
            "TestAirlines",
            new Address("TTT", "TTT", "Ljubinke Bobic 11/3"),
            "Opis neki",
            [],
            [],
            [],
            [],
            132,
            1
          ),
          new Destination(
            2,
            "Heathrow",
            "London",
            "UK",
            "Some bloody address 1/1"
          ),
          new Destination(
            1,
            "Nikola Tesla",
            "Belgrade",
            "Serbia",
            "Neznanog junaka jebem li ga 1/1"
          ),
          "09-June-2020",
          "12-June-2020",
          "15:00",
          "07:30",
          "0h:30min",
          "15",
          "Boeing 747",
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
          "500"
        ),
        [
          //   new User(
          //     1,
          //     "Testoje",
          //     "Testivojevic",
          //     "testoje@gmail.com",
          //     "a",
          //     "",
          //     "Belgreade",
          //     "065555333",
          //     "1"
          //   ),
        ]
      ),
      new CarReservation(
        2,
        this.carService.getCar(2),
        this.carService.getCarCompany(2),
        "05-Aug-2020",
        "23-Aug-2020",
        this.carService.getPrice(
          this.carService.getCar(2).plan,
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
    return this._allReservations
      .getValue()
      .find((reservation) => reservation.id === id);
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
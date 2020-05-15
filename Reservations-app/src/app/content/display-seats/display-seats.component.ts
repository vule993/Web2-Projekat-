import { Component, OnInit } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { futimes } from "fs";

@Component({
  selector: "app-display-seats",
  templateUrl: "./display-seats.component.html",
  styleUrls: ["./display-seats.component.css"],
})
export class DisplaySeatsComponent implements OnInit {
  //OVAJ TREBA DA PRIMA
  row_no = 0;
  seats_per_row = 0;
  formValues: [number, number, number, number, number, number];
  rows = [];

  constructor(private data: SeatsConfigService) {}

  getRowWidth() {
    return (
      this.formValues[2] +
      this.formValues[3] +
      this.formValues[4] +
      this.formValues[5]
    );
  }
  displayChanges() {
    for (let i = 0; i < this.formValues[0]; i++) {
      this.rows[i] = new Row();
      for (let j = 0; j < this.getRowWidth(); j++) {
        this.rows[i].seats[j] = new Seat(i * this.getRowWidth() + j + 1);
      }
    }
  }
  onSeatClick(event) {
    let seat_number = parseInt(event.toElement.innerText) - 1;
    let row_number = Math.floor(seat_number / this.getRowWidth());
    let col_number = seat_number % this.getRowWidth();

    if (event.toElement.classList.contains("taken-seat")) {
      this.rows[row_number].seats[col_number].taken = false;
    } else {
      this.rows[row_number].seats[col_number].taken = true;
    }
  }
  ngOnInit(): void {
    this.data.currentData.subscribe((data) => this.seatsDataHandler(data));
  }
  seatsDataHandler = function (data) {
    this.formValues = data;
    this.displayChanges();
  };
}

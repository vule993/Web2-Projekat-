import { Component, OnInit } from "@angular/core";

declare var $: any;

class Seat {
  taken = false;
  constructor(public seat_no: number = -1) {}
}
class Row {
  seats: Seat[] = [];
  constructor() {}
}

@Component({
  selector: "app-edit-seats",
  templateUrl: "./edit-seats.component.html",
  styleUrls: ["./edit-seats.component.css"],
})
export class EditSeatsComponent implements OnInit {
  row_no = 0;
  seats_per_row = 0;

  fieldsNo = 7;

  segmentsHeight = 0;
  segmentsCount = 0;
  segmentsWidth = [0, 0, 0, 0];
  displayForm = [true, false, false, false, false, false, false];
  rows = [];

  constructor() {}
  configName(value, next) {
    if (value !== "") {
      this.displayForm[next] = true;
    } else {
      for (let i = next; i < this.fieldsNo; i++) {
        this.displayForm[i] = false;
      }
    }
  }
  displayNext(value, next) {
    let current = next - 1;

    //ovde obradjujemo select-e
    if (isNaN(value)) {
      for (let i = next; i <= this.fieldsNo; i++) {
        this.displayForm[i] = false;
      }
    } else {
      //setujem vrednosti
      if (next === 2) {
        this.segmentsHeight = parseInt(value);
      }
      if (next === 3) {
        this.segmentsCount = parseInt(value);
      }
      if (next === 4) {
        this.segmentsWidth[0] = parseInt(value);
        this.seats_per_row = this.segmentsWidth.reduce((a, b) => a + b, 0);
      }
      if (next === 5) {
        this.segmentsWidth[1] = parseInt(value);
        this.seats_per_row = this.segmentsWidth.reduce((a, b) => a + b, 0);
      }
      if (next === 6) {
        this.segmentsWidth[2] = parseInt(value);
        this.seats_per_row = this.segmentsWidth.reduce((a, b) => a + b, 0);
      }
      if (next === 7) {
        this.segmentsWidth[3] = parseInt(value);
        this.seats_per_row = this.segmentsWidth.reduce((a, b) => a + b, 0);
      }

      //iscrtavam raspored sedista
      for (let i = 0; i < this.segmentsHeight; i++) {
        this.rows[i] = new Row();
        for (let j = 0; j < this.seats_per_row; j++) {
          this.rows[i].seats[j] = new Seat(i * this.seats_per_row + j + 1);
        }
      }

      //prikazujem sledeci
      if (next < 3 + this.segmentsCount) {
        this.displayForm[next] = true;
      }
    }
  }

  onSeatClick(event) {
    let seat_number = parseInt(event.toElement.innerText) - 1;
    let row_number = Math.floor(seat_number / this.seats_per_row);
    let col_number = seat_number % this.seats_per_row;

    if (event.toElement.classList.contains("taken-seat")) {
      this.rows[row_number].seats[col_number].taken = false;
    } else {
      this.rows[row_number].seats[col_number].taken = true;
    }
  }

  ngOnInit(): void {}
}

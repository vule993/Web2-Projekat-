import { Component, OnInit, Input } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";

@Component({
  selector: "app-display-seats",
  templateUrl: "./display-seats.component.html",
  styleUrls: ["./display-seats.component.css"],
})
export class DisplaySeatsComponent implements OnInit {
  formValues: [number, number, number, number, number, number];
  seats = [];

  //na ovo cemo bindovati
  @Input() currentSeatConfiguration: SeatConfiguration;
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
    this.seats = [];
    for (let i = 0; i < this.formValues[0]; i++) {
      this.seats[i] = new Row();
      for (let j = 0; j < this.getRowWidth(); j++) {
        this.seats[i].seats[j] = new Seat(i * this.getRowWidth() + j + 1);
      }
    }
  }
  onSeatClick(event) {
    let seat_number = parseInt(event.toElement.innerText) - 1;
    let row_number = Math.floor(seat_number / this.getRowWidth());
    let col_number = seat_number % this.getRowWidth();

    if (event.toElement.classList.contains("taken-seat")) {
      this.seats[row_number].seats[col_number].taken = false;
    } else {
      this.seats[row_number].seats[col_number].taken = true;
    }
  }
  ngOnInit(): void {
    this.data.currentData.subscribe((data) => this.seatsDataHandler(data));

    this.formValues = [
      this.currentSeatConfiguration.segmentsHeight,
      this.currentSeatConfiguration.segmentsNumber,
      this.currentSeatConfiguration.segmentOneWidth,
      this.currentSeatConfiguration.segmentTwoWidth,
      this.currentSeatConfiguration.segmentThreeWidth,
      this.currentSeatConfiguration.segmentFourWidth,
    ];
    this.displayChanges();
  }
  seatsDataHandler = function (data) {
    this.formValues = data;
    this.displayChanges();
  };
}

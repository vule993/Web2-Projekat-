import { Component, OnInit, Input } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";

declare var $: any;

@Component({
  selector: "app-display-seats",
  templateUrl: "./display-seats.component.html",
  styleUrls: ["./display-seats.component.css"],
})
export class DisplaySeatsComponent implements OnInit {
  formValues: [number, number, number, number, number, number];
  seats = []; //all seats
  selectedSeats = []; //seats that are marked
  //na ovo cemo bindovati
  @Input() currentSeatConfiguration: SeatConfiguration;
  constructor(
    private data: SeatsConfigService,
    private selectedSeatService: SelectedseatsService
  ) {
    let i = this.currentSeatConfiguration;
  }

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
      this.selectedSeats.forEach((seat, index) => {
        if (seat.id === this.seats[row_number].seats[col_number].id) {
          this.selectedSeats.splice(index, 1);
          //push to service
          this.selectedSeatService.setSelectedSeats(this.selectedSeats);
        }
      });
    } else {
      this.seats[row_number].seats[col_number].taken = true;
      this.selectedSeats.push(this.seats[row_number].seats[col_number]);
      //push to service
      this.selectedSeatService.setSelectedSeats(this.selectedSeats);
    }
  }
  ngOnInit(): void {
    this.selectedSeatService.setSelectedSeats([]);

    this.data.currentData.subscribe((data) => {
      this.formValues = data;
      this.displayChanges();
    });

    if (this.currentSeatConfiguration != undefined) {
      //ako ih samo prikazujem
      this.formValues = [
        this.currentSeatConfiguration.segmentsHeight,
        this.currentSeatConfiguration.segmentsNumber,
        this.currentSeatConfiguration.segmentOneWidth,
        this.currentSeatConfiguration.segmentTwoWidth,
        this.currentSeatConfiguration.segmentThreeWidth,
        this.currentSeatConfiguration.segmentFourWidth,
      ];
      this.displayChanges();

      //2.55 sirina sedista, 1.8 razmak izmedju segmenata
      let width =
        (this.getRowWidth() + 1) * 2.55 +
        (this.currentSeatConfiguration.segmentsNumber - 1) * 1.8;
      $("#seat-selector").css({
        width: width + "vw",
      });
    }
  }
}

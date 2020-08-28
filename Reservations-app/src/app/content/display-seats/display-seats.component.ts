import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { PlaneType } from "src/app/models/PlaneType.model";
import { PlaneTypeService } from "src/app/services/plane-type.service";
import { debug } from "console";
import { runInThisContext } from "vm";

declare var $: any;

@Component({
  selector: "app-display-seats",
  templateUrl: "./display-seats.component.html",
  styleUrls: ["./display-seats.component.css"],
})
export class DisplaySeatsComponent implements OnInit {
  seats = []; //all seats

  planeType: PlaneType;
  col1;
  col2;
  col3;
  col4;

  currentUrl: string;

  selectedSeats = []; //seats that are marked

  @Input() currentSeatConfig: SeatConfiguration;

  constructor(
    private data: PlaneTypeService,
    private selectedSeatService: SelectedseatsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.selectedSeatService.setSelectedSeats([]);
    this.currentUrl = window.location.href;

    if (this.currentSeatConfig != undefined) {
      this.planeType = this.currentSeatConfig.planeType;
      this.seats = this.currentSeatConfig.seats;

      this.col1 = this.planeType.segmentOneWidth;
      this.col2 = this.planeType.segmentTwoWidth;
      this.col3 = this.planeType.segmentThreeWidth;
      this.col4 = this.planeType.segmentFourWidth;

      this.seats = this.currentSeatConfig.seats;

      let width =
        (this.getRowWidth() + 1) * 2.55 +
        (this.currentSeatConfig.planeType.segmentsNumber - 1) * 1.8;

      //14 vw je sirina legende, pa ne moze manje od toga
      if (width <= 14) {
        $("#seat-selector").css({
          width: 14 + "vw",
        });
        return;
      }

      $("#seat-selector").css({
        width: width + "vw",
      });
    }
  }

  getRowWidth() {
    return this.col1 + this.col2 + this.col3 + this.col4;
  }
  ngOnInit() {}

  /**/

  onSeatClick(seatNo) {
    if (this.currentUrl.includes("avio/seat-config")) return;

    let seat_number = parseInt(seatNo) - 1;
    let row_number = Math.floor(seat_number / this.getRowWidth());
    let col_number = seat_number % this.getRowWidth();

    let seat = this.currentSeatConfig.seats[row_number].seats[
      col_number
    ] as Seat;

    if (this.currentUrl.includes("avio/flights")) {
      //na kreiranju leta
      if (seat.forFastReservation) {
        seat.forFastReservation = false;
        this.selectedSeats.forEach((s, i) => {
          if (seat.seatNo == s.seatNo) {
            this.selectedSeats.splice(i, 1);
          }
        });
      } else {
        seat.forFastReservation = true;
        this.selectedSeats.push(seat);
      }
    } else {
      //na prikazu korisnika
      if (seat.seatStatus == "CONFIRMED") {
        return;
      } else if (seat.forFastReservation) {
        return;
      } else if (seat.seatStatus == "TAKEN") {
        this.selectedSeats.forEach((s, index) => {
          if (s.seatNo == seat.seatNo) {
            this.selectedSeats.splice(index, 1);
            seat.seatStatus = "FREE";
          }
        });
      } else if (seat.seatStatus == "FREE") {
        this.selectedSeats.push(seat);
        seat.seatStatus = "TAKEN";
      }
    }

    this.selectedSeatService.setSelectedSeats(this.selectedSeats);

    this.seats = this.currentSeatConfig.seats;
  }
}

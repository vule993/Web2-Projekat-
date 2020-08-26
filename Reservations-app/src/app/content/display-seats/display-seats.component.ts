import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";
import { SelectedseatsService } from "src/app/services/selectedseats.service";
import { PlaneType } from "src/app/models/PlaneType.model";
import { PlaneTypeService } from "src/app/services/plane-type.service";
import { debug } from "console";
import { FlightsService } from "src/app/services/flights.service";

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

  isInAdminPanel = false; //da li se iscrtavanju pristupa iz admin panela
  //na osnovu ovoga znam kojom bojom da iscrtavam selektovana sedista

  //na ovo cemo bindovati
  @Input() currentSeatConfig: SeatConfiguration = new SeatConfiguration(
    0,
    new PlaneType(0, "asd", 6, 2, 2, 2, 0, 0)
  );

  constructor(
    private data: PlaneTypeService,
    private selectedSeatService: SelectedseatsService,
    private flightService: FlightsService
  ) {
    let i = this.currentSeatConfig;
  }

  ngOnChanges(currentSeatConfig: SimpleChanges) {
    // if (this.currentSeatConfig != undefined) {
    //   //ako ih samo prikazujem
    //   this.formValues = [
    //     this.currentSeatConfig.planeType.segmentsHeight,
    //     this.currentSeatConfig.planeType.segmentsNumber,
    //     this.currentSeatConfig.planeType.segmentOneWidth,
    //     this.currentSeatConfig.planeType.segmentTwoWidth,
    //     this.currentSeatConfig.planeType.segmentThreeWidth,
    //     this.currentSeatConfig.planeType.segmentFourWidth,
    //   ];
    //   this.displayChanges();
    //   //2.55 sirina sedista, 1.8 razmak izmedju segmenata
    //   let width =
    //     (this.getRowWidth() + 1) * 2.55 +
    //     (this.currentSeatConfig.planeType.segmentsNumber - 1) * 1.8;
    //   //14 vw je sirina legende, pa ne moze manje od toga
    //   if (width <= 14) {
    //     $("#seat-selector").css({
    //       width: 14 + "vw",
    //     });
    //     return;
    //   }
    //   $("#seat-selector").css({
    //     width: width + "vw",
    //   });
    // }
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

    if (this.currentSeatConfig != undefined) {
      debugger;
      this.seats = this.currentSeatConfig.seats;
    } else {
      for (let i = 0; i < this.formValues[0]; i++) {
        this.seats[i] = new Row();
        for (let j = 0; j < this.getRowWidth(); j++) {
          this.seats[i].seats[j] = new Seat(
            0,
            false,
            "FREE",
            null,
            i * this.getRowWidth() + j + 1
          );
        }
      }
    }
  }

  onSeatClick(seatNo) {
    let seat_number = parseInt(seatNo) - 1;
    let row_number = Math.floor(seat_number / this.getRowWidth());
    let col_number = seat_number % this.getRowWidth();

    let seat = this.seats[row_number].seats[col_number] as Seat;
    if (seat.seatStatus == "CONFIRMED") {
      return;
    } else if (seat.seatStatus == "TAKEN") {
      this.selectedSeats.forEach((s, index) => {
        if ((s as Seat).seatNo == seat.seatNo) {
          this.selectedSeats.splice(index, 1);
          seat.seatStatus = "FREE";
        }
      });
    } else if (seat.seatStatus == "FREE") {
      this.selectedSeats.push(seat);
      seat.seatStatus = "TAKEN";
    } else if (seat.forFastReservation == true) {
      return;
    }
    this.displayChanges();
  }
  ngOnInit(): void {
    // if (window.location.href.includes("admin/avio/flights")) {
    //   this.isInAdminPanel = true;
    // } else {
    //   this.isInAdminPanel = false;
    // }

    // this.selectedSeatService.setSelectedSeats([]);
    // //this.currentSeatConfig = null;
    // this.selectedSeats = [];

    this.data.currentData.subscribe((data) => {
      this.formValues = data;
      this.displayChanges();
    });

    if (this.currentSeatConfig != undefined && this.currentSeatConfig != null) {
      //ako ih samo prikazujem
      this.formValues = [
        this.currentSeatConfig.planeType.segmentsHeight,
        this.currentSeatConfig.planeType.segmentsNumber,
        this.currentSeatConfig.planeType.segmentOneWidth,
        this.currentSeatConfig.planeType.segmentTwoWidth,
        this.currentSeatConfig.planeType.segmentThreeWidth,
        this.currentSeatConfig.planeType.segmentFourWidth,
      ];
      this.data.changeData(this.formValues);
      this.displayChanges();

      //2.55 sirina sedista, 1.8 razmak izmedju segmenata
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
}

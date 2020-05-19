import { Component, OnInit } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";

declare var $: any;

@Component({
  selector: "app-edit-seats",
  templateUrl: "./edit-seats.component.html",
  styleUrls: ["./edit-seats.component.css"],
})
export class EditSeatsComponent implements OnInit {
  allSeatConfigurations: SeatConfiguration[];
  //OVAJ TREBA DA EMITUJE
  row_no = 0;
  seats_per_row = 0;

  animation_length = 750;
  d = 17; //sirina jednog elementa unutar slajdera
  measure_unit = "vw"; //merna jedinica za koliko se pomera slajder
  current_position = 0; //tekuca pozicija slajdera
  elementNumber = 0; //ukupan broj elemenata za prikaz
  elementDisplayedNo = 4; //broj vidljivih elemenata u slajderu
  idName = "formId";
  fieldsNo = 6;

  configurationName: string;
  displayForm = [false, false, false, false, false, false];
  formValues: [number, number, number, number, number, number];
  rows = [];

  constructor(private data: SeatsConfigService) {
    this.allSeatConfigurations = data.loadAllSeatConfigurations();
    this.elementNumber = data.getSeatConfigurationNumber();
  }

  configName(value, next) {
    if (value.data !== null) {
      this.displayForm[next] = true;
      this.configurationName = value.data;
    } else {
      this.rows = [];
      for (let i = next; i < this.fieldsNo; i++) {
        this.displayForm[i] = false;
      }
    }
  }
  /*
  kada se promeni segments number potrebno je ucitati 
  prvi sledeci select this.formValues[1]
  */
  displayNext(element, next) {
    let value = parseInt(element.target.value);
    this.rows = [];

    if (!isNaN(value)) {
      //setujem novu vrednost
      this.formValues[next - 1] = value;

      //fix za povecanje broja segmenata
      if (next == 2) {
        for (let i = 2; i < 2 + this.formValues[1]; i++) {
          if (this.displayForm[i] === false) {
            this.displayForm[i] = true;
            break;
          }
        }

        for (let i = 2 + this.formValues[1]; i < this.fieldsNo; i++) {
          if (this.displayForm[i] === true) {
            this.displayForm[i] = false;
            this.formValues[i] = 0;
          }
        }
      }

      //prikazem naredni select
      if (next < 2 + this.formValues[1]) {
        this.displayForm[next] = true;
      }

      //
    } else {
      this.hideSelects(next, this.fieldsNo);
      this.unsetFormValues(next - 1, this.fieldsNo);
    }
    this.data.changeData(this.formValues);
    //iscrtam prikaz sedista
    //this.displayChanges();
  }

  getRowWidth() {
    return (
      this.formValues[2] +
      this.formValues[3] +
      this.formValues[4] +
      this.formValues[5]
    );
  }

  hideSelects(from, to) {
    for (let i = from; i < to; i++) {
      this.displayForm[i] = false;
      //$(this.idName + i)[0].value = 0;
    }
  }
  unsetFormValues(from, to) {
    for (let i = from; i < to; i++) {
      this.formValues[i] = 0;
      $("#" + this.idName + i).val("*");
    }
  }
  //za slider
  prev() {
    var pozicija = $(".klizac").get(0).style.left;
    //var trenutna = pozicija.split(".")[0];
    if (this.current_position == 0) {
    } else {
      if (!$(".klizac").is(":animated")) {
        this.current_position++;

        $(".klizac").animate(
          { left: this.current_position * this.d + this.measure_unit },
          this.animation_length,
          "linear"
        );
      }
    }
  }
  next() {
    var pozicija = $(".klizac").get(0).style.left;
    //2 je broj elemenata u slajderu van vidnog polja
    //(n - 4 - jer se 4 vide) ?mozda 2 - 1
    if (
      Math.abs(this.current_position) ==
      this.elementNumber - this.elementDisplayedNo
    ) {
    } else {
      if (!$(".klizac").is(":animated")) {
        this.current_position--;

        $(".klizac").animate(
          // 0..k * 17 (sirina jednog elementa) + 'px' (merna jedinica)
          { left: this.current_position * this.d + this.measure_unit },
          this.animation_length,
          "linear"
        );
      }
    }
  }
  ngOnInit(): void {
    this.data.currentData.subscribe((data) => (this.formValues = data));
  }
}

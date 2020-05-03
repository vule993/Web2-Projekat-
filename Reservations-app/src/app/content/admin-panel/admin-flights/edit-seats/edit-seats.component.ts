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

  animation_length = 750;
  d = 17;
  measure_unit = "vw";
  current_position = 0;

  idName = "formId";
  fieldsNo = 6;

  displayForm = [false, false, false, false, false, false];
  formValues = [0, 0, 0, 0, 0, 0];
  rows = [];

  constructor() {}

  configName(value, next) {
    if (value.data !== null) {
      this.displayForm[next] = true;
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

    //iscrtam prikaz sedista
    this.displayChanges();
  }

  displayChanges() {
    for (let i = 0; i < this.formValues[0]; i++) {
      this.rows[i] = new Row();
      for (let j = 0; j < this.getRowWidth(); j++) {
        this.rows[i].seats[j] = new Seat(i * this.getRowWidth() + j + 1);
      }
    }
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
  getRowWidth() {
    return (
      this.formValues[2] +
      this.formValues[3] +
      this.formValues[4] +
      this.formValues[5]
    );
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
    if (Math.abs(this.current_position) >= 2) {
    } else {
      if (!$(".klizac").is(":animated")) {
        this.current_position--;

        $(".klizac").animate(
          { left: this.current_position * this.d + this.measure_unit },
          this.animation_length,
          "linear"
        );
      }
    }
  }
  ngOnInit(): void {}
}

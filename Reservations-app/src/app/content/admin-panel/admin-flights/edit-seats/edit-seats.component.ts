import { Component, OnInit } from "@angular/core";
import { Seat, Row } from "src/app/models/Seat.model";
import { SeatsConfigService } from "src/app/services/seats-config.service";
import { SeatConfiguration } from "src/app/models/Seat-configuration.model";
import { PlaneType } from "src/app/models/PlaneType.model";
import { PlaneTypeService } from "src/app/services/plane-type.service";

declare var $: any;

@Component({
  selector: "app-edit-seats",
  templateUrl: "./edit-seats.component.html",
  styleUrls: ["./edit-seats.component.css"],
})
export class EditSeatsComponent implements OnInit {
  allPlaneTypes;
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

  planeType = new PlaneType(0, "", 10, 4, 2, 3, 3, 2);

  constructor(private planeTypeService: PlaneTypeService) {
    this.elementNumber = planeTypeService.getPlaneTypeSeatsNumber();
  }

  configName(value, next) {
    if (value.data !== null) {
      this.displayForm[next] = true;
      this.configurationName = value.target.value;
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
    debugger;
    if (!isNaN(value)) {
      //setujem novu vrednost
      this.formValues[next - 1] = value;

      //fix za povecanje broja segmenata
      if (next == 2) {
        this.formValues[1] = value;

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

    this.planeTypeService.changeData(this.formValues);
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

  savePlaneType() {
    if (this.validate()) {
      let planeType = new PlaneType(
        0,
        this.configurationName,
        this.formValues[0],
        this.formValues[1],
        this.formValues[2],
        this.formValues[3],
        this.formValues[4],
        this.formValues[5]
      );

      this.planeTypeService.createPlaneType(planeType).subscribe();
      this.allPlaneTypes.push(planeType);
      //this.elementNumber = this.seatService.getSeatConfigurationNumber();
      //this.allSeatConfigurations = this.seatService.getAllSeatConfigurations();
      $(".message")[0].innerText = "Config saved!";
      $(".alert").removeClass("alert-danger").addClass("alert-success");
    } else {
      $(".message")[0].innerText = "Config incomplete!";
      $(".alert").removeClass("alert-success").addClass("alert-danger");
    }
    $(".alert").fadeIn(1000);
  }
  validate(): boolean {
    if (
      this.configurationName != undefined &&
      this.configurationName != "" &&
      this.formValues[0] > 0 && //height
      this.formValues[1] > 0 //segments no
    ) {
      for (let i = 2; i < 2 + this.formValues[1]; i++) {
        if (this.formValues[i] < 1) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  disableWarning(data) {
    $(".alert").fadeOut(1000);
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
    this.planeTypeService.getAllPlaneTypes().subscribe((allPlaneTypes) => {
      this.allPlaneTypes = allPlaneTypes;
      this.elementNumber = (allPlaneTypes as PlaneType[]).length;
    });

    this.planeTypeService.currentData.subscribe((data) => {
      this.formValues = data;
      this.elementNumber = this.planeTypeService.getPlaneTypeSeatsNumber();
      //this.allSeatConfigurations = this.seatService.getAllSeatConfigurations();
    });
  }
}

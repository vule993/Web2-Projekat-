import { Component, OnInit, Input } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  //animation
  animation_length = 750;
  fieldsNo = 6;
  d = 17; //sirina jednog elementa unutar slajdera
  measure_unit = "vw"; //merna jedinica za koliko se pomera slajder
  current_position = 0; //tekuca pozicija slajdera
  elementNumber = 0; //ukupan broj elemenata za prikaz
  elementDisplayedNo = 4; //broj vidljivih elemenata u slajderu
  idName = "formId";

  @Input("data") data;
  constructor() {}

  ngOnInit(): void {}

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
      Math.abs(this.current_position) >=
      this.data.values.length - this.elementDisplayedNo
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
}

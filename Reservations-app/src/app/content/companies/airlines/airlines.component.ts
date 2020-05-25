import { Component, OnInit } from "@angular/core";

declare var $: any;
@Component({
  selector: "app-airlines",
  templateUrl: "./airlines.component.html",
  styleUrls: ["./airlines.component.css"],
})
export class AirlinesComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;

  constructor() {}

  openFilter() {
    $(".filter").fadeIn(300);
  }
  closeFilter() {
    $(".filter").fadeOut(300);
  }
  ngOnInit(): void {
    this.departCalendar = $(function () {
      $("#departTime").datepicker({
        // format: "yyyy-mm-dd",
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });

    this.returnCalendar = $(function () {
      $("#returnTime").datepicker({
        format: "dd-MM-yyyy",
        autoclose: true,
      });
    });
  }
}

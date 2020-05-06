import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-edit-flights",
  templateUrl: "./edit-flights.component.html",
  styleUrls: ["./edit-flights.component.css"],
})
export class EditFlightsComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;

  constructor() {}

  ngOnInit(): void {
    this.departCalendar = $(function () {
      $("#departTime").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
      });
    });

    this.returnCalendar = $(function () {
      $("#returnTime").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
      });
    });
  }
}

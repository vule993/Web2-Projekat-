import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  departCalendar: any;
  returnCalendar: any;

  constructor() {}

  ngOnInit(): void {
    this.departCalendar = $(function() {
      $(".form-box #departTime").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
      });
    });

    this.returnCalendar = $(function() {
      $(".form-box #returnTime").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
      });
    });
  }
}

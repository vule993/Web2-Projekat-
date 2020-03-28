import { Component, OnInit } from "@angular/core";
import { Offer } from "src/app/models/offer.model";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnInit {
  selectedOffer: Offer;

  constructor() {}

  ngOnInit(): void {}
}

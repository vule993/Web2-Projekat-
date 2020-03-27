import { Component, OnInit, Input } from "@angular/core";
import { Offer } from "src/app/models/offer.model";

@Component({
  selector: "app-offer-item",
  templateUrl: "./offer-item.component.html",
  styleUrls: ["./offer-item.component.css"]
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Offer;
  selectedLink: string = "overview";
  // displayOverview: boolean = false;
  // displayLocation: boolean = false;
  // displayServices: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  activateOverview() {
    this.selectedLink = "overview";
  }

  activateLocation() {
    this.selectedLink = "location";
  }

  activateServices() {
    this.selectedLink = "services";
  }
}

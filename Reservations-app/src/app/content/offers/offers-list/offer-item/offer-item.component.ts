import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Offer } from "src/app/models/offer.model";

@Component({
  selector: "app-offer-item",
  templateUrl: "./offer-item.component.html",
  styleUrls: ["./offer-item.component.css"]
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Offer;
  @Output() offerSelected = new EventEmitter<void>();
  selectedLink: string = "overview";

  constructor() {}

  ngOnInit(): void {}

  //method for book it button
  //here I will emit my own event to parent component (offer-list).
  onSelected() {
    this.offerSelected.emit();
  }

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

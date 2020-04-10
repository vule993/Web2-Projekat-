import { Component, OnInit, Input } from "@angular/core";
import { Offer } from "src/app/models/offer.model";
import { OffersService } from "src/app/services/offers.service";

@Component({
  selector: "app-offer-item",
  templateUrl: "./offer-item.component.html",
  styleUrls: ["./offer-item.component.css"]
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Offer;

  selectedLink: string = "overview";

  constructor(private offerService: OffersService) {}

  ngOnInit(): void {}

  //method for book it button
  onSelected() {
    this.offerService.offerSelected.emit(this.offer);
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

import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Offer } from "src/app/models/offer.model";
import { OffersService } from "src/app/services/offers.service";

@Component({
  selector: "app-offers-list",
  templateUrl: "./offers-list.component.html",
  styleUrls: ["./offers-list.component.css"]
})
export class OffersListComponent implements OnInit {
  @Output() offerWasSelected = new EventEmitter<Offer>();

  selectedLink: string;
  offers: Offer[];

  constructor(private offerService: OffersService) {
    this.offers = offerService.loadOffers();
  }

  ngOnInit(): void {}

  onOfferSelected(offer: Offer) {
    this.offerWasSelected.emit(offer);
  }
}

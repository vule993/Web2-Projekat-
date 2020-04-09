import { Component, OnInit } from "@angular/core";
import { Offer } from "src/app/models/offer.model";
import { OffersService } from "src/app/services/offers.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"],
  providers: [OffersService]
})
export class OffersComponent implements OnInit {
  selectedOffer: Offer;

  constructor(private offerService: OffersService) {}

  ngOnInit(): void {
    this.offerService.offerSelected.subscribe((offer: Offer) => {
      this.selectedOffer = offer;
    });
  }
}

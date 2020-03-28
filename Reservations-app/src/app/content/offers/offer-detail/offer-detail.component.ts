import { Component, OnInit, Input } from "@angular/core";
import { Offer } from "src/app/models/offer.model";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.css"]
})
export class OfferDetailComponent implements OnInit {
  @Input() offer: Offer;

  constructor() {}

  ngOnInit(): void {}
}

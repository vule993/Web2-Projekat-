import { Component, OnInit } from "@angular/core";
import { Offer } from "src/app/models/offer.model";

@Component({
  selector: "app-offers-list",
  templateUrl: "./offers-list.component.html",
  styleUrls: ["./offers-list.component.css"]
})
export class OffersListComponent implements OnInit {
  overViewBtnClicked: boolean = false;
  locationBtnClicked: boolean = false;
  servicesBtnClicked: boolean = false;

  now: Date = new Date();
  offers: Offer[] = [
    //ovo ce se u nekom servisu kasnije ucitavati sa web apija
    new Offer(
      "Beograd",
      "Berlin",
      "26/03 - 13h",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg/1200px-Aerial_view_of_Berlin_%2832881394137%29.jpg",
      70
    ),
    new Offer(
      "Beograd",
      "Amsterdam",
      "24/03 - 13h",
      "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
      100
    ),
    new Offer(
      "Beograd",
      "Amsterdam",
      "24/03 - 13h",
      "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
      100
    ),
    new Offer(
      "Beograd",
      "Amsterdam",
      "24/03 - 13h",
      "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
      100
    )
  ];

  constructor() {}

  ngOnInit(): void {}

  activateOverview() {
    this.overViewBtnClicked = true;
  }

  activateLocation() {
    this.locationBtnClicked = true;
  }

  activateServices() {
    this.servicesBtnClicked = true;
  }
}

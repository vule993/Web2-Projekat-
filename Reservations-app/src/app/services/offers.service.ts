import { Injectable } from "@angular/core";
import { Offer } from "../models/offer.model";

@Injectable({
  providedIn: "root"
})
export class OffersService {
  constructor() {}

  getOffers(): Array<Offer> {
    let newOffers: Offer[] = [
      new Offer(
        null,
        "Beograd",
        "Berlin",
        "26/03 - 13h",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg/1200px-Aerial_view_of_Berlin_%2832881394137%29.jpg",
        70
      ),
      new Offer(
        "Bla bla ovaj offer ima opis",
        "Beograd",
        "Amsterdam",
        "24/03 - 13h",
        "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
        100
      ),
      new Offer(
        null,
        "Beograd",
        "Amsterdam",
        "24/03 - 13h",
        "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
        100
      ),
      new Offer(
        null,
        "Beograd",
        "Amsterdam",
        "24/03 - 13h",
        "https://www.iamexpat.nl/sites/default/files/styles/article--full/public/river-houses-in-amsterdam-netherlands.jpg?itok=StL_iS_m",
        100
      )
    ];

    return newOffers;
  }

  loadOffers() {
    return this.getOffers();
  }
}

import { Component, OnInit } from "@angular/core";

export interface Card {
  id: number; //0->Basic  1->Plus  2->Pro
  cardItems: CardItem[];
}

export interface CardItem {
  id: number;
  title: string;
}

@Component({
  selector: "app-edit-car-prices",
  templateUrl: "./edit-car-prices.component.html",
  styleUrls: [
    "../../admin-flights/admin-flights.component.css",
    "./edit-car-prices.component.css"
  ]
})
export class EditCarPricesComponent implements OnInit {
  cardToEdit: Card;

  constructor() {}

  ngOnInit(): void {}

  editBasic() {}

  editPlus() {}

  editPro() {}
}

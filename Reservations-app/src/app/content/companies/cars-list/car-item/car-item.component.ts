import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-car-item",
  templateUrl: "./car-item.component.html",
  styleUrls: ["./car-item.component.css"]
})
export class CarItemComponent implements OnInit {
  public companyName: string = "Ime kompanije";
  public rating: number = 4.5;
  public description: string = "opis kompanije";
  public address: string = "lokacija kompanije";

  constructor() {}

  ngOnInit(): void {}
}

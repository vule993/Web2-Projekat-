import { Component, OnInit } from "@angular/core";
import { Link } from "src/app/models/Link";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-head-admin",
  templateUrl: "./head-admin.component.html",
  styleUrls: [
    "../admin-flights/admin-flights.component.css",

    "./head-admin.component.css"
  ]
})
export class HeadAdminComponent implements OnInit {
  links: Link[] = [];

  constructor() {
    this.links.push(
      new Link(
        "../../assets/site/icons/car-white.png",
        "MY DETAILS",
        "profile"
      ),
      new Link(
        "../../assets/site/icons/car-white.png",
        "AVIO COMPANIES",
        "avio-companies"
      ),
      new Link("../../assets/site/icons/car-white.png", "USERS", "users"),

      new Link(
        "../../assets/site/icons/home-white.png",
        "CAR COMPANIES",
        "car-companies"
      ),

      new Link(
        "../../../../assets/site/icons/plus.png",
        "REGISTER ADMINS",
        "register-admin"
      )
    );
  }

  ngOnInit(): void {}
}

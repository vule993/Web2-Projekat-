import { Component, OnInit } from "@angular/core";
import { Link } from "src/app/models/Link";

import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";

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
      new Link("../../../../assets/face.png", "MY DETAILS", "profile"),
      new Link(
        "../../../../assets/site/icons/plane-white.png",
        "AVIO COMPANIES",
        "avio-companies"
      ),
      new Link("../../../../assets/site/icons/all-users.png", "USERS", "users"),

      new Link(
        "../../../../assets/site/icons/car-white.png",
        "CAR COMPANIES",
        "car-companies"
      ),

      new Link(
        "../../../../assets/site/icons/plus.png",
        "REGISTER ADMINS",
        "register-admin"
      ),
      new Link(
        "../../../../assets/site/icons/plus.png",
        "CREATE CAR COMPANY",
        "create-car-company"
      ),
      new Link(
        "../../../../assets/site/icons/plus.png",
        "CREATE AVIO COMPANY",
        "create-avio-company"
      )
    );
  }

  ngOnInit(): void {}
}

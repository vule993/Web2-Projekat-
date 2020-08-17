import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-edit-car-profile",
  templateUrl: "./edit-car-profile.component.html",
  styleUrls: [
    "./edit-car-profile.component.css",
    "../../admin-flights/edit-avio-profile/edit-avio-profile.component.css"
  ]
})
export class EditCarProfileComponent implements OnInit {
  carCompany: CarCompany;
  dataLoaded: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getAdminCarCompany(localStorage.getItem("userId"))
      .subscribe(data => {
        this.carCompany = data as CarCompany;
        this.dataLoaded = true;
        localStorage.setItem("carCompanyId", this.carCompany.id + "");
      });
  }
}

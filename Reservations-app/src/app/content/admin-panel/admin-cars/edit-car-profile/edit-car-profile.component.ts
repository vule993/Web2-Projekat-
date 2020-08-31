import { Component, OnInit } from "@angular/core";
import { CarCompany } from "src/app/models/CarCompany.model";
import { AdminService } from "src/app/services/admin.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

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
  editCompanyForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.adminService
      .getAdminCarCompany(localStorage.getItem("userId"))
      .subscribe(data => {
        this.carCompany = data as CarCompany;
        this.dataLoaded = true;
        localStorage.setItem("carCompanyId", this.carCompany.id + "");
      });
  }

  onSubmit() {
    let companyName = this.editCompanyForm.value["companyName"];
    let companyAddress = this.editCompanyForm.value["companyAddress"];
    let description = this.editCompanyForm.value["description"];

    this.carCompany.name = companyName;
    this.carCompany.address = companyAddress;
    this.carCompany.description = description;

    this.adminService.editCompany(this.carCompany).subscribe(
      res => {
        this.toastrService.success(
          "Succesffuly updated company details!",
          "Company details edited"
        );
      },
      err => {
        this.toastrService.error("Error while updating company", "Error");
      }
    );
  }

  initForm() {
    let companyName = "";
    let companyAddress = "";
    let description = "";

    this.editCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      companyAddress: new FormControl(companyAddress, Validators.required),
      description: new FormControl(description, Validators.required)
    });
  }
}

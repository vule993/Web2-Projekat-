import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/User.model";
import { UsersService } from "src/app/services/users.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Address } from "src/app/models/address.model";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-avio-company",
  templateUrl: "./create-avio-company.component.html",
  styleUrls: [
    "./create-avio-company.component.css",
    "../../../register/register.component.css",
  ],
})
export class CreateAvioCompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  selectedValue: UserModel;
  admins: UserModel[];

  constructor(
    private userService: UsersService,
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe(
        (users) => (this.admins = users.filter((u) => u.status == "AvioAdmin"))
      );

    this.initForm();
  }

  onSubmit() {
    const address = new Address(
      this.createCompanyForm.value["country"],
      this.createCompanyForm.value["city"],
      this.createCompanyForm.value["street"]
    );

    //uzimam admina, umesto email-a
    //let admin = this.admins.filter(a => a.email == this.selectedValue.email)[0];

    const avioCompany = new AirlineCompany(
      0,
      this.createCompanyForm.value["companyName"],
      address,
      this.createCompanyForm.value["description"],
      [],
      [],
      [],
      3,
      this.selectedValue.email
      //admin
    );

    this.adminService.createAvioCompany(avioCompany).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.createCompanyForm.reset();
          this.toastrService.success(
            "You are succesfully created new Avio company!",
            "Succesfull"
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private initForm() {
    let companyName = "";
    let description = "";
    let street = "";
    let city = "";
    let country = "";
    let admins = "";

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      description: new FormControl(description, Validators.required),
      street: new FormControl(street, Validators.required),
      city: new FormControl(city, Validators.required),
      country: new FormControl(country, Validators.required),
      admins: new FormControl(admins, Validators.required),
    });
  }
}

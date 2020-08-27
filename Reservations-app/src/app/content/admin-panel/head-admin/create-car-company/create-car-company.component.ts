import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { CarCompany } from "src/app/models/CarCompany.model";
import { Car } from "src/app/models/car.model";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-car-company",
  templateUrl: "./create-car-company.component.html",
  styleUrls: [
    "./create-car-company.component.css",
    "../../../register/register.component.css"
  ]
})
export class CreateCarCompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
  selectedValue: any;
  admins: UserModel[];
  cars: Car[] = [];

  center: google.maps.LatLngLiteral = {
    lat: 51.678418,
    lng: 7.809007
  };
  zoom = 2;
  locationChosen = false;

  constructor(
    private userService: UsersService,
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe(
        users => (this.admins = users.filter(u => u.status == "CarAdmin"))
      );

    this.initForm();
  }

  onSubmit() {
    const carCompany = new CarCompany(
      0,
      this.createCompanyForm.value["companyName"],
      3.5,
      this.createCompanyForm.value["description"],
      this.createCompanyForm.value["street"],
      this.createCompanyForm.value["city"],
      "",
      this.cars,
      this.selectedValue, //admin,
      this.center.lat,
      this.center.lng
    );

    this.adminService.createCarCompany(carCompany).subscribe(
      (res: any) => {
        this.createCompanyForm.reset();
        this.toastrService.success(
          "You are succesfully created new Car company!",
          "Succesfull"
        );
      },
      err => {
        this.toastrService.error("Error", "Oops, something went wrong :(");
        console.log(err);
      }
    );
  }

  private initForm() {
    let companyName = "";
    let description = "";
    let street = "";
    let city = "";
    let admins = "";

    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(companyName, Validators.required),
      description: new FormControl(description, Validators.required),
      street: new FormControl(street, Validators.required),
      city: new FormControl(city, Validators.required),
      admins: new FormControl(admins, Validators.required)
    });
  }

  placeMarker(event) {
    this.center = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    this.locationChosen = true;
  }
}

import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { UserModel } from "src/app/models/User.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FormModel } from "src/app/models/formModel";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./admin-profile.component.html",
  styleUrls: [
    "./admin-profile.component.css",
    "../../../profile/edit-profile/edit-profile.component.css"
  ]
})
export class AdminProfileComponent implements OnInit {
  public currentUser: UserModel;
  adminProfileForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private userService: UsersService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserProfile()
      .subscribe((profile: UserModel) => (this.currentUser = profile));

    this.initForm();
  }

  onSubmit() {
    const newUser = new FormModel(
      this.adminProfileForm.value["firstName"],
      this.adminProfileForm.value["secondName"],
      this.adminProfileForm.value["email"],
      this.adminProfileForm.value["password1"],
      this.adminProfileForm.value["city"],
      this.adminProfileForm.value["street"],
      this.adminProfileForm.value["phone"]
    );

    this.adminService.changeAdminDetails(newUser).subscribe((res: any) => {
      if (res.succeeded) {
        this.adminProfileForm.reset();
        this.toastrService.success(
          "You are succesfully changed your details!",
          "Details Changed"
        );
      }
    });
  }

  private initForm() {
    let firstName = "";
    let lastName = "";
    let email = "";
    let street = "";
    let city = "";
    let phone = "";
    let pass1 = "";
    let pass2 = "";

    this.adminProfileForm = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      street: new FormControl(street, Validators.required),
      city: new FormControl(city, Validators.required),
      phone: new FormControl(phone, Validators.required),
      password1: new FormControl(pass1, Validators.required),
      password2: new FormControl(pass2, Validators.required)
    });
  }
}

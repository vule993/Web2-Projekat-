import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FormModel } from "src/app/models/formModel";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-register-admin",
  templateUrl: "./register-admin.component.html",
  styleUrls: [
    "./register-admin.component.css",
    "../../../register/register.component.css"
  ]
})
export class RegisterAdminComponent implements OnInit {
  registerAdminForm: FormGroup;
  selectedOption: string;

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initCarAdminForm();
  }

  onSubmit() {
    const newUser = new FormModel(
      this.registerAdminForm.value["firstName"],
      this.registerAdminForm.value["secondName"],
      this.registerAdminForm.value["email"],
      this.registerAdminForm.value["password1"],
      this.registerAdminForm.value["city"],
      this.registerAdminForm.value["street"],
      this.registerAdminForm.value["phone"]
    );

    switch (this.selectedOption) {
      case "Car Admin":
        this.adminService.registerCarAdmin(newUser).subscribe(
          (res: any) => {
            if (res.succeeded) {
              this.registerAdminForm.reset();
              this.toastrService.success(
                "You are succesfully registered car admin!",
                "Succesfull Registration"
              );
            } else {
              res.forEach(element => {
                switch (element.code) {
                  default:
                    this.toastrService.error(
                      element.description,
                      "Registration Failed"
                    );
                }
              });
            }
          },
          err => {
            console.log(err);
          }
        );
        break;
      case "Avio Admin":
        this.adminService.registerAvioAdmin(newUser).subscribe(
          (res: any) => {
            if (res.succeeded) {
              this.registerAdminForm.reset();
              this.toastrService.success(
                "You are succesfully registered avio admin!",
                "Succesfull Registration"
              );
            } else {
              res.forEach(element => {
                switch (element.code) {
                  default:
                    this.toastrService.error(
                      element.description,
                      "Registration Failed"
                    );
                }
              });
            }
          },
          err => {}
        );
        break;
      default:
        console.log("registration failed");
    }

    this.adminService.registerCarAdmin(newUser).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.registerAdminForm.reset();
          this.toastrService.success(
            "You are succesfully registered car admin!",
            "Succesfull Registration"
          );
        } else {
          res.forEach(element => {
            switch (element.code) {
              default:
                this.toastrService.error(
                  element.description,
                  "Registration Failed"
                );
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onAvioAdminSubmit() {
    console.log("avio admin submit");
  }

  private initCarAdminForm() {
    let firstName = "";
    let secondName = "";
    let email = "";
    let street = "";
    let city = "";
    let phone = "";
    let pass1 = "";
    let pass2 = "";
    let role = "";

    this.registerAdminForm = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      secondName: new FormControl(secondName, Validators.required),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]),
      adminType: new FormControl(role, Validators.required),
      street: new FormControl(street, Validators.required),
      city: new FormControl(city, Validators.required),
      phone: new FormControl(phone, Validators.required),
      password1: new FormControl(pass1, Validators.required),
      password2: new FormControl(pass2, Validators.required)
    });
  }
}
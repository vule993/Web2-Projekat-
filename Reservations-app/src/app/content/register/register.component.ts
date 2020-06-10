import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";

import { FormModel } from "../../models/formModel";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    //ovo kasnije mozda obrisati i proslediti samo registerUser(this.registerForm.value)
    const newUser = new FormModel(
      this.registerForm.value["firstName"],
      this.registerForm.value["secondName"],
      this.registerForm.value["email"],
      this.registerForm.value["password1"],
      this.registerForm.value["city"],
      this.registerForm.value["street"],
      this.registerForm.value["phone"]
    );

    this.userService.registerUser(newUser).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.registerForm.reset();
          this.toastrService.success(
            "You are succesfully registered!",
            "Succesfull Registration"
          );
          this.router.navigate(["login"]);
        } else {
          res.errors.forEach((element) => {
            switch (element.code) {
              case "DuplicateUserName":
                //
                this.toastrService.error(
                  element.desctiption,
                  "Registration failed"
                );
                break;
              default:
                this.toastrService.error(
                  element.desctiption,
                  "Registration failed"
                );
            }
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log("user: " + newUser.name + "  ----- uspesno registrovan");
  }

  private initForm() {
    let firstName = "";
    let secondName = "";
    let email = "";
    let street = "";
    let city = "";
    let phone = "";
    let pass1 = "";
    let pass2 = "";

    this.registerForm = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      secondName: new FormControl(secondName, Validators.required),
      email: new FormControl(email, [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ]),
      street: new FormControl(street, Validators.required),
      city: new FormControl(city, Validators.required),
      phone: new FormControl(phone, Validators.required),
      password1: new FormControl(pass1, Validators.required),
      password2: new FormControl(pass2, Validators.required),
    });
  }
}

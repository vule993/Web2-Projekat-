import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/User.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    //ovo kasnije mozda obrisati i proslediti samo registerUser(this.registerForm.value)
    const newUser = new User(
      1,
      this.registerForm.value["firstName"],
      this.registerForm.value["secondName"],
      this.registerForm.value["email"],
      this.registerForm.value["password1"],
      "https://lh3.googleusercontent.com/-Iz0gN6v9Mjw/AAAAAAAAAAI/AAAAAAAAABg/6gTLYKMexAw/photo.jpg",
      this.registerForm.value["city"],
      this.registerForm.value["phone"],
      "user"
    );

    this.userService.registerUser(newUser);
    console.log("user: " + newUser.name + "  ----- uspesno registrovan");
    this.registerForm.reset();
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

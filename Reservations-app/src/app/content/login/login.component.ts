import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (localStorage.getItem("token") != null) {
      this.router.navigate(["home"]);
      this.toastr.info("You are already logged in");
    }
  }

  onSubmit() {
    //pokupiti podatke sa forme?

    this.userService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token); //save token
        this.router.navigate(["profile"]);
      },
      err => {
        if (err.status == 400) {
          //bad req
          this.toastr.error("Incorrect Username or Password", "Login Failed");
        } else {
          console.log(err);
        }
      }
    );
  }

  initForm() {
    let username = "";
    let password = "";

    this.loginForm = new FormGroup({
      username: new FormControl(username, Validators.required),
      password: new FormControl(password, Validators.required)
    });
  }
}

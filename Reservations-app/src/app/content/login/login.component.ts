import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { STORAGE_TOKEN_KEY, STORAGE_USER_ID_KEY } from "../../const/constants";
import { UserModel } from "src/app/models/User.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    public OAuth: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (localStorage.getItem("token") != null) {
      this.router.navigate(["home"]);
      this.toastr.info("You are already logged in");
    }
  }

  onSubmit() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token); //save token
        localStorage.setItem("userId", res.user.email);

        localStorage.setItem("id", res.user.id.toString());
        localStorage.setItem("firstName", res.user.firstName);
        localStorage.setItem("lastName", res.user.lastName);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("phoneNumber", res.user.phoneNumber);
        localStorage.setItem("city", res.user.city);
        localStorage.setItem("street", res.user.street);
        localStorage.setItem("image", res.user.image);

        if (this.userService.roleMatch(["Admin"])) {
          this.router.navigateByUrl("admin/head-admin/profile");
        } else if (this.userService.roleMatch(["CarAdmin"])) {
          this.router.navigateByUrl("admin/car/edit-company");
        } else if (this.userService.roleMatch(["AvioAdmin"])) {
          this.router.navigateByUrl("admin/avio/edit-profile");
        } else {
          this.router.navigate(["profile"]);
        }

        this.toastr.success("Succesfully logged in", "Login Success");
      },
      (err) => {
        if (err.status == 400) {
          //bad req
          this.toastr.error(
            "Incorrect Username or Password or email is not confirmed.",
            "Login Failed"
          );
        } else {
          console.log(err);
        }
      }
    );
  }

  LoginWithGoogle() {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialusers) => {
      console.log(socialusers);

      this.userService.socialLogin(socialusers).then((res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.socialUser.email);
        this.router.navigate(["profile"]);
      });
    });
  }

  initForm() {
    let email = "";
    let password = "";

    this.loginForm = new FormGroup({
      email: new FormControl(email, Validators.required),
      password: new FormControl(password, Validators.required),
    });
  }
}

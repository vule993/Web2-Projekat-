import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-mail-confirmation",
  templateUrl: "./mail-confirmation.component.html",
  styleUrls: ["./mail-confirmation.component.css"]
})
export class MailConfirmationComponent implements OnInit {
  userEmail: string;
  message: string = "";

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //get email route
    route.params.subscribe(params => {
      this.userEmail = params["email"];
    });
  }

  ngOnInit(): void {
    this.userService.confirmEmail(this.userEmail).then(
      () => {
        this.message = "Email Verified";
        this.router.navigateByUrl("");
      },
      err => {
        this.message = err.error.message;
      }
    );
  }
}

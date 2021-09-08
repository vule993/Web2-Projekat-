import { Component, OnInit } from "@angular/core";
import { NotificationService } from "./services/notification.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "BookIT";

  constructor(
    public notificationsService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (
      localStorage.getItem("userId") == undefined ||
      localStorage.getItem("userId") == ""
    ) {
      return;
    }
    this.notificationsService.startConnection();
    this.startHttpRequest();
  }
  private startHttpRequest = () => {
    this.http
      .get(environment.serverAddress + "/api/notification")
      .subscribe((res) => {
        //debugger;
        console.log(res);
      });
  };
}

import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.css"],
})
export class CompanyListComponent implements OnInit {
  @Input("avCompanies") avioCompanies;
  @Input("rcCompanies") rentACarCompanies;
  url = window.location.pathname + "/";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.url = val.url + "/";
      }
    });
  }
}

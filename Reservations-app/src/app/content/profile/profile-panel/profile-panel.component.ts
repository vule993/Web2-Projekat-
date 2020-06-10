import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-panel",
  templateUrl: "./profile-panel.component.html",
  styleUrls: ["./profile-panel.component.css"],
})
export class ProfilePanelComponent implements OnInit {
  activeTab;
  constructor(router: Router) {
    router.events.subscribe((val) => {
      let fullUrl = window.location.href;
      this.activeTab = fullUrl.split("/")[4];
    });
  }

  ngOnInit(): void {
    let fullUrl = window.location.href;
    this.activeTab = fullUrl.split("/")[4];
  }
  setActiveTab(value) {
    this.activeTab = value;
  }
}

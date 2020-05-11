import { Component, OnInit, Input } from "@angular/core";
import { Link } from "src/app/models/Link";

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"],
})
export class SideNavComponent implements OnInit {
  @Input() links: Link[];

  constructor() {
    this.links = this.links;
  }

  ngOnInit(): void {}
}

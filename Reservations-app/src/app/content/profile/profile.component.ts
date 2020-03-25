import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onProfilePictureHover() {
    var element = document.getElementById("photo-icon");
    let i = 0;
    let animation = setInterval(() => {
      element.style.opacity = i.toString();
      i += 0.1;
      if (i > 0.6) {
        clearInterval(animation);
      }
    }, 50);
  }
  onProfilePictureLeave() {
    var element = document.getElementById("photo-icon");
    let i = 0.6;
    let animation = setInterval(() => {
      element.style.opacity = i.toString();
      i -= 0.1;
      if (i < 0) {
        clearInterval(animation);
      }
    }, 50);
  }
}

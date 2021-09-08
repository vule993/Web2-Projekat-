import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserModel } from "../../models/User.model";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  activeTab;
  allUsers: UserModel[];
  public currentUser: UserModel = null;

  baseUrl = environment.serverAddress + "/api/Upload/UploadFile";
  serverAddress = environment.serverAddress;

  fileToUpload;
  reader = new FileReader();

  progress: number;
  message: string;

  profilePicture;

  @Output() onUploadFinished = new EventEmitter();

  viewProfile: boolean; //fleg koji govori da li je neko tu samo da pogleda profil
  constructor(
    private userService: UsersService,
    private router: Router,
    private _http: HttpClient,
    private _sanitizer: DomSanitizer
  ) {
    //router sluzi da skeniram url svaki put kad se promeni -> tako cu znati da li je
    //profil samo za gledanje ili je to moj profil
    router.events.subscribe((val) => {
      let fullUrl = window.location.href;
      this.viewProfile = fullUrl.includes("profile-view") ? true : false;
    });
    // pretplacujemo se na dogadjaj ponovnog klika na link profila(posto se ne ucitava
    // kompletna komponenta ova metoda menja this.activeTab na default vrednost)
  }

  ngOnInit(): void {
    let fullUrl = window.location.href;
    this.activeTab = fullUrl.split("/")[4];
    let email = localStorage.getItem("userId");
    console.log("Ulogovan je: " + email);

    this.currentUser = <UserModel>JSON.parse(localStorage.getItem("user"));
    // this.userService.getUserProfile().subscribe((user: UserModel) => {
    //   this.currentUser = <UserModel>user;

    //ovo videti
    if (
      this.currentUser.image != undefined &&
      this.currentUser.image != "" &&
      this.currentUser.image != null
    ) {
      this.profilePicture =
        environment.serverAddress +
        "/Resources/Users/" +
        this.currentUser.image;
    } else {
      this.profilePicture = "../../assets/face.png";
    }

    $("#pr-picture").css({
      "background-image": "url(" + this.profilePicture + ")",
    });

    //preostalo: friends
    // });
  }

  // setuje koji je tab selektovan kako bi dobio drugaciji background
  setActiveTab(value) {
    this.activeTab = value;
  }

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

  // dole radi sliku

  UploadFile(files) {
    if (files.length === 0) return;

    this.fileToUpload = <File>files[0];

    this.reader.onloadend = () => {
      $("#preview").css({
        "background-image": "url(" + this.reader.result + ")",
      });
    };

    this.reader.readAsDataURL(this.fileToUpload);
  }

  UploadPhoto() {
    let formData = new FormData();

    if (this.fileToUpload == null) {
      alert("Choose a icon...");
      return;
    }

    formData.append("file", this.fileToUpload, this.fileToUpload.name);
    formData.append("email", localStorage.getItem("userId"));
    formData.append("type", "profilePicture");
    formData.append("name", "");

    this._http
      .post(this.baseUrl, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = "Upload success!";
          this.onUploadFinished.emit(event.body);
          $("#pr-picture").css({
            "background-image": "url(" + this.reader.result + ")",
          });
        }
      });
  }
}

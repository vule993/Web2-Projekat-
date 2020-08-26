import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { PlaneServicesService } from "src/app/services/plane-services.service";
import { environment } from "src/environments/environment";

import { AvailableService } from "src/app/models/AvailableServices.model";

declare var $: any;

@Component({
  selector: "app-edit-other-services",
  templateUrl: "./edit-other-services.component.html",
  styleUrls: ["./edit-other-services.component.css"],
})
export class EditOtherServicesComponent implements OnInit {
  baseURL = "http://localhost:5000/api/Upload/UploadFile";
  message: string;

  services: AvailableService[] = [];
  servicesToShow: AvailableService[] = [];

  fileToUpload;
  serverAddress: string = environment.serverAddress;
  progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private _http: HttpClient,
    private _planeServicesService: PlaneServicesService
  ) {}

  uploadFile = (files) => {
    if (files.length === 0) return;

    this.fileToUpload = <File>files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      $("#preview").css({
        "background-image": "url(" + reader.result + ")",
      });
    };

    reader.readAsDataURL(this.fileToUpload);
  };

  DeleteService(id: number) {
    this.servicesToShow.forEach((service, index) => {
      if (service.id == id) {
        this.servicesToShow.splice(index, 1);
      }
    });

    this._planeServicesService.deleteAvailableService(id).subscribe();
  }

  CreateService() {
    let formData = new FormData();

    let name: string = $("#serviceName").val() as string;
    if (name == "" || name == undefined) {
      alert("Type a name...");
      return;
    }

    if (this.fileToUpload == null) {
      alert("Choose a icon...");
      return;
    }

    // this._planeServicesService
    //   .createService(new PlaneService(0, this.fileToUpload.name, name))
    //   .subscribe();

    formData.append("file", this.fileToUpload, this.fileToUpload.name);
    formData.append("email", localStorage.getItem("email"));
    formData.append("type", "services");
    formData.append("name", name);

    this._http
      .post(this.baseURL, formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = "Upload success!";
          this.onUploadFinished.emit(event.body);
          this._planeServicesService
            .getAllAvailableServices()
            .subscribe((services) => {
              this.services = services as AvailableService[];
              this.servicesToShow = this.services.filter((s) => s.status);
            });
        }
      });
  }
  ngOnInit(): void {
    this._planeServicesService
      .getAllAvailableServices()
      .subscribe((services) => {
        this.services = services as AvailableService[];
        this.servicesToShow = this.services.filter((x) => x.status);
      });
  }
}

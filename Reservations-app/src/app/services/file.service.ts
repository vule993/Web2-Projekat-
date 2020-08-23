import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FileService {
  baseURL = "http://localhost:5000/api/File";
  message: string;
  progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private _http: HttpClient) {}

  uploadFile = (files) => {
    if (files.length === 0) return;

    let fileToUpload = <File>files[0];
    let formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

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
        }
      });
  };
}

import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ReservationNotification } from "../models/ReservationNotification";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  baseUrl = environment.serverAddress + "/api/Notification/";
  constructor(private _http: HttpClient) {}

  getAllReservationNotifications(email: string) {
    return this._http.get(this.baseUrl + "GetAllNotifications/" + email);
  }
  createReservationNotification(notification: ReservationNotification) {
    return this._http.post(
      this.baseUrl + "CreateReservationNotification/",
      notification
    );
  }
  markReservationNotificationAsViewd(notificationId: number) {
    return this._http.get(
      this.baseUrl + "MarkReservationNotificationAsViewd/" + notificationId
    );
  }
  resolveNotification(notificationId: number) {
    return this._http.get(
      this.baseUrl + "ResolveNotification/" + notificationId
    );
  }
}

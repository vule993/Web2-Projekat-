import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ReservationNotification } from "../models/ReservationNotification";
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public data: number; //za signalR
  private hubConnection: signalR.HubConnection;

  //
  baseUrl = environment.serverAddress + "/api/Notification/";
  constructor(private _http: HttpClient) {}

  //
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/notification")
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started..."))
      .catch((err) => console.log("Error while starting connection..."));
  };
  public addTransferNotificationDataListener = () => {
    this.hubConnection.on("transfernotificationsdata", (data) => {
      this.data = data;
      console.log(this.data);
      //alert(data);
    });
  };

  //
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

import { Injectable } from "@angular/core";
import { User } from "../models/User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormModel } from "../models/formModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = "http://localhost:5000/api";

  allUsers() {
    let allUsers: User[] = [
      new User(
        "Vukasin",
        "Radic",
        "vule993@outlook.com",
        "a",
        "https://www.edn.com/wp-content/uploads/media-1167183-tesla3-290x249-071012.jpg",
        "Belgrade",
        "065/523-0691",
        "admin"
      ),
      new User(
        "Aleksandar",
        "Novakovic",
        "sale.novakovic97@gmail.com",
        "a",
        "https://www.biography.com/.image/t_share/MTY2NTIzMzc4MTI2MDM4MjM5/vincent_van_gogh_self_portrait_painting_musee_dorsay_via_wikimedia_commons_promojpg.jpg",
        "Sremska Mitrovica",
        "060/631-7215",
        "admin"
      ),
      new User(
        "Pera",
        "Peric",
        "peki91@gmail.com",
        "a",
        "https://ichef.bbci.co.uk/news/410/media/images/82399000/jpg/_82399978_75952740.jpg",
        "Naissus",
        "065/125-0061",
        "plane-admin"
      ),
      new User(
        "Novica",
        "Novic",
        "nov21@outlook.com",
        "a",
        "https://scontent.fbeg1-1.fna.fbcdn.net/v/t1.0-9/s960x960/57116380_2354409607950971_1631347725708558336_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_eui2=AeErDU3OB6EJUNpRoU9pE9XCRnAqhX7uThpGcCqFfu5OGl7wcugAX2mhlcv0XDHmXodv0N95yLyK8nJBz3Uh0tcB&_nc_ohc=xBesFVegyfkAX8NcJxZ&_nc_ht=scontent.fbeg1-1.fna&_nc_tp=7&oh=27e7a9878e7aa03738eb533e108773c1&oe=5EEF5C10",
        "New Now",
        "063/124-456",
        "car-admin"
      ),
      new User(
        "Nekodugackoime",
        "Nekojosduzeprezime",
        "a@a.com",
        "a",
        "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/animal-animal-photography-ape-1670413-38cshn63e0eeraruoe2k1s.jpg",
        "Paris",
        "063/555-333",
        "user"
      )
    ];
    return allUsers;
  }

  loadAllUsers() {
    return this.allUsers();
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL + "/User/GetAll");
  }

  registerUser(user: FormModel) {
    //this.allUsers().push(user);

    return this.httpClient.post(this.baseURL + "/User/Register", user);
  }

  loginUser(formData) {
    return this.httpClient.post(this.baseURL + "/User/Login", formData);
  }

  getUserProfile() {
    //need to append jwt token into this request -> this is now done in auth.interceptor

    let a = this.httpClient.get(this.baseURL + "/User/Profile");
    return a;
  }

  //function for managing user roles
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    //token = header.payload.signature
    var payload = JSON.parse(
      window.atob(localStorage.getItem("token").split(".")[1])
    );
    var userRole = payload.role;

    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }
}

import { Injectable } from "@angular/core";
import { User } from "../models/User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormModel } from "../models/formModel";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = "http://localhost:5000/api";

  allUsers() {
    let allUsers: User[] = [
      new User(
        1,
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
        1,
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
        1,
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
        1,
        "Novica",
        "Novic",
        "nov21@outlook.com",
        "a",
        "https://lh3.googleusercontent.com/-Iz0gN6v9Mjw/AAAAAAAAAAI/AAAAAAAAABg/6gTLYKMexAw/photo.jpg",
        "New Now",
        "063/124-456",
        "car-admin"
      ),
      new User(
        1,
        "Nekodugackoime",
        "Nekojosduzeprezime",
        "a@a.com",
        "a",
        "https://www.asianscientist.com/wp-content/uploads/bfi_thumb/animal-animal-photography-ape-1670413-38cshn63e0eeraruoe2k1s.jpg",
        "Paris",
        "063/555-333",
        "user"
      ),
    ];
    return allUsers;
  }

  loadAllUsers() {
    return this.allUsers();
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
}

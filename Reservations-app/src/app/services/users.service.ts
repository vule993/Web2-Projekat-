import { Injectable } from "@angular/core";
import { UserModel } from "../models/User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormModel } from "../models/formModel";
import { Observable } from "rxjs";
import { SocialUser } from "angularx-social-login";
import { STORAGE_USER_ID_KEY } from "../const/constants";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  readonly baseURL = "http://localhost:5000/api";

  getAllUsers(): Observable<UserModel[]> {
    let a = this.httpClient.get<UserModel[]>(this.baseURL + "/User/getall");
    return a;
  }

  updateUser(user: UserModel) {
    return this.httpClient.put(this.baseURL + "/User/Update", user);
  }
  getUserProfile() {
    //need to append jwt token into this request -> this is now done in auth.interceptor

    let a = this.httpClient.get<UserModel>(this.baseURL + "/User/Profile");
    return a;
  }

  getAllFriends(email: string) {
    return this.httpClient.get<UserModel[]>(
      this.baseURL + "/User/Friends/" + email
    );
  }

  addFriend(userEmail: string, friendEmail: string) {
    return this.httpClient.put(this.baseURL + "/User/AddFriend", {
      UsersEmail: userEmail,
      FriendsEmail: friendEmail,
    });
  }

  removeFriend(userEmail: string, friendEmail: string) {
    return this.httpClient.put(this.baseURL + "/User/RemoveFriend", {
      UsersEmail: userEmail,
      FriendsEmail: friendEmail,
    });
  }

  registerUser(user: FormModel) {
    //this.allUsers().push(user);

    return this.httpClient.post(this.baseURL + "/User/Register", user);
  }

  loginUser(formData) {
    return this.httpClient.post(this.baseURL + "/User/Login", formData);
  }

  socialLogin(user: SocialUser) {
    return this.httpClient
      .post(this.baseURL + "/User/SocialLogin", user)
      .toPromise();
  }

  // getLoggedInUser() {
  //   const email = localStorage.getItem(STORAGE_USER_ID_KEY);
  //   return this.httpClient.get<UserModel>(this.baseURL + "/User/Get" + email);
  // }

  //function for managing user roles
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    //token = header.payload.signature
    var payload = JSON.parse(
      window.atob(localStorage.getItem("token").split(".")[1])
    );
    var userRole = payload.role;

    allowedRoles.forEach((element) => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });

    return isMatch;
  }

  confirmEmail(email: string) {
    const options = {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    };

    return this.httpClient
      .post<string>(this.baseURL + "/User/ConfirmEmail", {
        email,
      })
      .toPromise();
  }
}

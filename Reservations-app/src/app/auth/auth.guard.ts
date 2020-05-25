import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "../services/users.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UsersService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //check if use is authenticated
    if (localStorage.getItem("token") != null) {
      let roles = next.data["permittedRoles"] as Array<string>;

      if (roles) {
        if (this.userService.roleMatch(roles)) return true;
        else {
          this.toastr.error("You are not allowed for this action", "Forbidden");
          return false;
        }
      }

      return true;
    } else {
      this.router.navigate(["login"]);
      this.toastr.error("Please Login first", "Access Denied");
      return false;
    }
  }
}

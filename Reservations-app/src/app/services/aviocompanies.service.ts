import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AvioCompany } from "../models/AvioCompany.model";
import { Address } from "../models/address.model";
import { Destination } from "../models/Destination.model";
import { UserModel } from "../models/User.model";

@Injectable({
  providedIn: "root",
})
export class AviocompaniesService {
  private _allAviocompanies = new BehaviorSubject<AvioCompany[]>([
    new AvioCompany(
      "Montenegro Airlines",
      new Address("Crna Gora", "Podgorica", "Mi smo Srbi 1/1"),
      "Srpska provincijska aviokompanija",
      [],
      [],
      //["10", "5", "11"],
      [],
      0,
      3,
      new UserModel(
        "AvioAdmin",
        "asd",
        "avioadmin@outlook.com",
        "",
        "",
        "",
        "",
        "",
        "",
        [],
        [],
        1
      )
    ),
    new AvioCompany(
      "Air Serbia",
      new Address("Serbia", "Belgrade", "Neznanog junaka bb"),
      "Air Serbia je jedna od najboljih balkanskih aviokompanija",
      [],
      [],
      //["10", "5", "11"],
      [],
      0,
      1,
      new UserModel(
        "Head",
        "Admin",
        "admin@outlook.com",
        "",
        "",
        "",
        "",
        "",
        "",
        [],
        [],
        2
      )
    ),
  ]);
  public allAvioCompanies = this._allAviocompanies.asObservable();
  constructor() {}

  addAvioCompany(company: AvioCompany) {}
  removeAvioCompany(companyId: number) {}
  getAllAvioCompanies(): AvioCompany[] {
    return this._allAviocompanies.getValue();
  }
}

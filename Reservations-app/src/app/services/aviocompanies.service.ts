import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AvioCompany } from "../models/AvioCompany.model";
import { Address } from "../models/address.model";
import { Destination } from "../models/Destination.model";

@Injectable({
  providedIn: "root",
})
export class AviocompaniesService {
  private _allAviocompanies = new BehaviorSubject<AvioCompany[]>([
    new AvioCompany(
      "Air Serbia",
      new Address("Serbia", "Belgrade", "Neznanog junaka bb"),
      "Air Serbia je jedna od najboljih balkanskih aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      1
    ),
    new AvioCompany(
      "Montenegro Airlines",
      new Address("Crna Gora", "Podgorica", "Mi smo Srbi 1/1"),
      "Srpska provincijska aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      2
    ),
    new AvioCompany(
      "Air Serbia",
      new Address("Serbia", "Belgrade", "Neznanog junaka bb"),
      "Air Serbia je jedna od najboljih balkanskih aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      3
    ),
    new AvioCompany(
      "Montenegro Airlines",
      new Address("Crna Gora", "Podgorica", "Mi smo Srbi 1/1"),
      "Srpska provincijska aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      4
    ),
    new AvioCompany(
      "Air Serbia",
      new Address("Serbia", "Belgrade", "Neznanog junaka bb"),
      "Air Serbia je jedna od najboljih balkanskih aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      11
    ),
    new AvioCompany(
      "Montenegro Airlines",
      new Address("Crna Gora", "Podgorica", "Mi smo Srbi 1/1"),
      "Srpska provincijska aviokompanija",
      null,
      null,
      ["10", "5", "11"],
      null,
      0,
      5
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

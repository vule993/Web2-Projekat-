import { Component, OnInit, Input } from "@angular/core";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";
import { ThrowStmt } from "@angular/compiler";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompanyProfileComponent } from "src/app/content/companies/airlines/airline-company-profile/airline-company-profile.component";
import { AvioCompany } from "src/app/models/AvioCompany.model";

@Component({
  selector: "app-edit-destinations",
  templateUrl: "./edit-destinations.component.html",
  styleUrls: ["./edit-destinations.component.css"],
})
export class EditDestinationsComponent implements OnInit {
  public allDestinations;

  company: AvioCompany;

  airportName = "";
  address = "";
  city = "";
  country = "";

  constructor(
    private _destinationsService: DestinationsService,
    private _airlineCompaniesService: AviocompaniesService
  ) {}
  insertDestination() {
    let destination: Destination = new Destination(
      0,
      this.airportName,
      this.city,
      this.country,
      this.address
    );

    this.company.destinations.push(destination);
    this._destinationsService
      .addDestination(this.company, destination)
      .subscribe();

    // this.data.addDestination(
    //   new Destination(
    //     0,
    //     this.airportName,
    //     this.city,
    //     this.country,
    //     this.address
    //   )
    // );
  }
  removeDestination(id: number) {
    this._destinationsService.removeDestination(id);
  }

  ngOnInit(): void {
    let adminEmail = localStorage.getItem("email");
    this._airlineCompaniesService.allAvioCompanies.subscribe((companies) => {
      if (companies.length > 0) {
        let company = companies.find(
          (company) => company.admin.email == adminEmail
        );
        this.company = company;
      }
    });

    this._destinationsService.allDestinations.subscribe(
      (data) => (this.allDestinations = data)
    );
  }
}

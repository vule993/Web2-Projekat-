import { Component, OnInit, Input } from "@angular/core";
import { Destination } from "src/app/models/Destination.model";
import { DestinationsService } from "src/app/services/destinations.service";
import { ThrowStmt } from "@angular/compiler";
import { AviocompaniesService } from "src/app/services/aviocompanies.service";
import { AirlineCompanyProfileComponent } from "src/app/content/companies/airlines/airline-company-profile/airline-company-profile.component";
import { AirlineCompany } from "src/app/models/AirlineCompany.model";

@Component({
  selector: "app-edit-destinations",
  templateUrl: "./edit-destinations.component.html",
  styleUrls: ["./edit-destinations.component.css"],
})
export class EditDestinationsComponent implements OnInit {
  public allDestinations;

  company: AirlineCompany;
  airportName = "";
  address = "";
  city = "";
  country = "";

  constructor(
    private _destinationsService: DestinationsService,
    private _airlineCompaniesService: AviocompaniesService
  ) {}
  createDestination() {
    let destination: Destination = new Destination(
      0,
      this.airportName,
      this.city,
      this.country,
      this.address
    );

    this.allDestinations.push(destination);

    return this._destinationsService
      .create(this.company, destination)
      .subscribe();
  }
  deleteDestination(id: string) {
    this.allDestinations.forEach((d, index) => {
      if (d.id == id) {
        this.allDestinations.splice(index, 1);
      }
    });

    return this._destinationsService.delete(id).subscribe();
  }

  ngOnInit(): void {
    let adminEmail = localStorage.getItem("email");
    this._airlineCompaniesService.getAllCompanies().subscribe((companies) => {
      if ((companies as AirlineCompany[]).length > 0) {
        let company = (companies as AirlineCompany[]).find(
          (company) => company.adminEmail == adminEmail
        );
        this.company = company;
      }
    });

    this._destinationsService.getAll().subscribe((data) => {
      this.allDestinations = data;
    });
  }
}

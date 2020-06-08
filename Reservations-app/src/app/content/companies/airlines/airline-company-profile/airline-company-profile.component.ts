import { Component, OnInit } from "@angular/core";
import { SelectedcompanyService } from "src/app/services/selectedcompany.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { Flight } from "src/app/models/Flight.model";
import { Reservation } from "src/app/models/Reservation.model";
import { ReservationService } from "src/app/services/reservation.service";

@Component({
  selector: "app-airline-company-profile",
  templateUrl: "./airline-company-profile.component.html",
  styleUrls: ["./airline-company-profile.component.css"],
})
export class AirlineCompanyProfileComponent implements OnInit {
  currentCompany;
  allReservatons: Reservation[];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue; //for stars
  iframeSrc = "";
  constructor(
    private route: ActivatedRoute,
    private selectedcompanyService: SelectedcompanyService,
    private router: Router,
    private reservationsService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationsService.allReservations.subscribe(
      (reservations) => (this.allReservatons = reservations)
    );
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.currentCompany = this.selectedcompanyService.currentCompany;
      }
    });
    this.selectedcompanyService.currentCompany.subscribe(
      (company) => (this.currentCompany = company)
    );
  }

  getReservationsWithDiscount(): Reservation[] {
    return this.allReservatons.filter(
      (reservation) =>
        reservation.airlineReservation.flight.company.name ===
          this.currentCompany.name &&
        reservation.airlineReservation.flight.discount != ""
    );
  }

  countStar(star) {
    this.selectedValue = star;
    console.log("Value of star", star);
    this.currentCompany.rating = star; //nece ovako moci
  }

  createURL() {
    this.iframeSrc = `https://maps.google.com/maps?q=${this.currentCompany.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    return this.iframeSrc;
  }
}

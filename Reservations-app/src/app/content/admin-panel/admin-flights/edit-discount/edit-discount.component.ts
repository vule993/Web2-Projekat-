import { Component, OnInit } from "@angular/core";
import { DiscountService } from "src/app/services/discount.service";

@Component({
  selector: "app-edit-discount",
  templateUrl: "./edit-discount.component.html",
  styleUrls: ["./edit-discount.component.css"],
})
export class EditDiscountComponent implements OnInit {
  allDiscounts;
  newDiscount;
  constructor(private discountService: DiscountService) {}

  addDiscount() {
    this.discountService.addDiscount(this.newDiscount);
  }
  removeDiscount(discount) {
    this.discountService.removeDiscount(discount);
  }
  ngOnInit(): void {
    this.discountService.allDiscounts.subscribe(
      (discounts) => (this.allDiscounts = discounts)
    );
  }
}

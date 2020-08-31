import { Component, OnInit } from "@angular/core";
import { DiscountService } from "src/app/services/discount.service";
import { Discount } from "src/app/models/Discount.model";
declare var $: any;
@Component({
  selector: "app-edit-discount",
  templateUrl: "./edit-discount.component.html",
  styleUrls: ["./edit-discount.component.css"],
})
export class EditDiscountComponent implements OnInit {
  allDiscounts: Discount[] = [];

  constructor(private discountService: DiscountService) {}

  addDiscount() {
    let d = new Discount(0, $("#discount").val(), true);
    this.discountService.createDiscount(d).subscribe((x) => {
      this.discountService
        .getAllDiscounts()
        .subscribe((d) => (this.allDiscounts = d as Discount[]));
    });
    this.allDiscounts.push(d);
  }

  removeDiscount(id) {
    this.discountService.deleteDiscount(id).subscribe((x) => {
      this.discountService
        .getAllDiscounts()
        .subscribe((d) => (this.allDiscounts = d as Discount[]));
    });
    this.allDiscounts.forEach((d, index) => {
      if (d.id == id) {
        this.allDiscounts.splice(index, 1);
      }
    });
  }
  ngOnInit(): void {
    this.discountService
      .getAllDiscounts()
      .subscribe((d) => (this.allDiscounts = d as Discount[]));
  }
}

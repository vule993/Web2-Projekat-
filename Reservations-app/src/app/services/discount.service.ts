import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: "root",
})
export class DiscountService {
  private _allDiscounts = new BehaviorSubject<number[]>([5]);
  allDiscounts = this._allDiscounts.asObservable();
  constructor() {}
  addDiscount(discount: number) {
    let discounts = this._allDiscounts.getValue();
    discounts.push(discount);
    this._allDiscounts.next(discounts);
  }
  removeDiscount(discount: number) {
    let discounts = this._allDiscounts.getValue();
    discounts.forEach((disc, index) => {
      if (disc === discount) {
        discounts.slice(index, 1);
      }
    });
    this._allDiscounts.next(discounts);
  }
}

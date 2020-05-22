export class Address {
  constructor(
    private country: string,
    private city: string,
    private street: string
  ) {}
  getFullAddress() {
    return this.street + ", " + this.city + " ," + this.country;
  }
}

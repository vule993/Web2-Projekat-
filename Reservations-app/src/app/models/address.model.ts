export class Address {
  constructor(
    public country: string,
    public city: string,
    public street: string,
    public id: number = 0
  ) {}

  public getFullAddress() {
    return this.street + ", " + this.city + " ," + this.country;
  }
  public toString() {
    return this.street + ", " + this.city + " ," + this.country;
  }
}

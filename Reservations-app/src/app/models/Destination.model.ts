export class Destination {
  constructor(
    public id,
    public airportName: string,
    public city: string,
    public country: string,
    public address: string
  ) {}
  info() {
    return (
      this.airportName +
      ", " +
      this.address +
      ", " +
      this.city +
      ", " +
      this.country
    );
  }
}

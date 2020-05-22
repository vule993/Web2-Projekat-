export class Destination {
  constructor(
    public id,
    private airportName: string,
    private city: string,
    private country: string,
    private address: string
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

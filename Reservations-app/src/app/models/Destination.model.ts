export class Destination {
  constructor(
    public id: number,
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

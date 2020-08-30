export class FlightRating {
  constructor(
    public id: number,
    public userEmail: string,
    public flightId: number,
    public rating: number
  ) {}
}

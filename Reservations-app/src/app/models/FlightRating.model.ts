export class FlightRating {
  constructor(
    public id: number,
    public userEmail: string,
    public flightId: string,
    public rating: number
  ) {}
}

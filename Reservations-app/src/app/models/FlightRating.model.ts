export class FlightRating {
  constructor(
    public id: number,
    public userEmail: string,
    public reservationId: number,
    public rating: number
  ) {}
}

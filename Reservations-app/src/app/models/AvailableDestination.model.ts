export class AvailableDestination {
  constructor(
    public id: number,
    public airportName: string,
    public city: string,
    public country: string,
    public address: string,
    public status: boolean = true
  ) {}
}

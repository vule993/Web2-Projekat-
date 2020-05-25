import { Destination } from "./Destination.model";

export class Flight {
  constructor(
    private startDate: string,
    private returnDate: string,
    private estimationTime: string,
    private discount: string,
    private planeType: string,
    private destinations: Destination[],
    private price: string
  ) {}
}

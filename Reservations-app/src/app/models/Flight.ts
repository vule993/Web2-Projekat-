import { Destination } from "./Destination.model";
import { AvioCompany } from "./AvioCompany.model";

export class Flight {
  constructor(
    private id: number,
    public company: AvioCompany,
    private startDate: string,
    private returnDate: string,
    private estimationTime: string,
    private discount: string,
    private planeType: string,
    private destinations: Destination[],
    private otherServices: string,
    private price: string
  ) {}
}

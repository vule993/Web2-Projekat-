import { Destination } from "./Destination.model";
import { AvioCompany } from "./AvioCompany.model";

export class Flight {
  constructor(
    public id: number,
    public company: AvioCompany,
    public startDate: string,
    public returnDate: string,
    public startTime: string,
    public endTime: string,
    public estimationTime: string,
    public discount: string,
    public planeType: string,
    public destinations: Destination[],
    public otherServices: string,
    public price: string
  ) {}
}

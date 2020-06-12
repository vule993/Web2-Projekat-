import { Address } from "./address.model";

export class Company {
  constructor(
    public name: string,
    public address: Address,
    public description: string,
    public id: number
  ) {}
}

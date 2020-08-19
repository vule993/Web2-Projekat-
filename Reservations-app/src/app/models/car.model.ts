export class Car {
  constructor(
    public description: string,
    public mark: string,
    public year: number,
    public seats: number, //passengers
    public price: number,
    public rating: number,
    public image: string,
    public category: string,
    public isReserved: boolean,
    public id?: number
  ) {}
}

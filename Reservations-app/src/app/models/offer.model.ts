export class Offer {
  constructor(
    public description: string,
    public source: string,
    public destination: string,
    public time: string,
    public imagePath: string,
    public price: number
  ) {}
}

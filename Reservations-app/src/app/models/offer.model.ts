export class Offer {
  constructor(
    public description: string = "Thank you for flying with us!",
    public source: string,
    public destination: string,
    public time: string,
    public imagePath: string,
    public price: number
  ) {}
}

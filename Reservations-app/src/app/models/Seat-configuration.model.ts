import { Seat, Row } from "./Seat.model";

export class SeatConfiguration {
  public static count: number = 0;

  constructor(
    public id: number = 0,
    public name: string,
    public segmentsHeight: number,
    public segmentsNumber: number,
    public segmentOneWidth: number,
    public segmentTwoWidth: number,
    public segmentThreeWidth: number,
    public segmentFourWidth: number,
    public seats: Row[]
  ) {
    this.generateSeats();
    SeatConfiguration.count = SeatConfiguration.count + 1;
  }
  generateSeats() {
    this.seats = [];
    for (let i = 0; i < this.segmentsHeight; i++) {
      this.seats[i] = new Row();
      for (let j = 0; j < this.getRowWidth(); j++) {
        this.seats[i].seats[j] = new Seat(i * this.getRowWidth() + j + 1);
      }
    }
  }
  getRowWidth() {
    return (
      this.segmentOneWidth +
      this.segmentTwoWidth +
      this.segmentThreeWidth +
      this.segmentFourWidth
    );
  }
}

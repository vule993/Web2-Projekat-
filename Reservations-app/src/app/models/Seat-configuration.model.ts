import { Seat, Row } from "./Seat.model";
import { PlaneType } from "./PlaneType.model";

export class SeatConfiguration {
  public static count: number = 0;

  public seats: Row[];
  constructor(public id: number = 0, public planeType: PlaneType) {
    this.generateSeats();
    SeatConfiguration.count = SeatConfiguration.count + 1;
  }

  generateSeats() {
    this.seats = [];
    for (let i = 0; i < this.planeType.segmentsHeight; i++) {
      this.seats[i] = new Row();
      for (let j = 0; j < this.getRowWidth(); j++) {
        //OVO JE IZMENJENO PRI PROMENI MODELA
        this.seats[i].seats[j] = new Seat(
          0,
          false,
          "FREE",
          null,
          i * this.getRowWidth() + j + 1
        );
      }
    }
  }

  getRowWidth() {
    return (
      this.planeType.segmentOneWidth +
      this.planeType.segmentTwoWidth +
      this.planeType.segmentThreeWidth +
      this.planeType.segmentFourWidth
    );
  }
}

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
    public segmentFourWidth: number
  ) {
    SeatConfiguration.count = SeatConfiguration.count + 1;
  }
}

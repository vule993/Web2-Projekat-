export class PlaneType {
  constructor(
    public id: number = 0,
    public name: string,
    public segmentsHeight: number,
    public segmentsNumber: number,
    public segmentOneWidth: number,
    public segmentTwoWidth: number,
    public segmentThreeWidth: number,
    public segmentFourWidth: number
  ) {}

  getRowWidth() {
    return (
      this.segmentOneWidth +
      this.segmentTwoWidth +
      this.segmentThreeWidth +
      this.segmentFourWidth
    );
  }
}

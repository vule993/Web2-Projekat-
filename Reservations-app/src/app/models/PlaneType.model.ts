export class PlaneType {
  constructor(
    public id: number = 0,
    public name: string,
    public segmentsHeight: number,
    public segmentsNumber: number,
    public segmentOneWidth: number = 0,
    public segmentTwoWidth: number = 0,
    public segmentThreeWidth: number = 0,
    public segmentFourWidth: number = 0
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

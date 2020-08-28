export class CarRate {
  constructor(
    public rate: number,
    public userEmail: string,
    public carId?: number,
    public carCompanyId?: number
  ) {}
}

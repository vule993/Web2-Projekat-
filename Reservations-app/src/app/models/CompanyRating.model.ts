export class CompanyRating {
  constructor(
    public id: number,
    public userEmail: string,
    public companyId: number,
    public rating: number
  ) {}
}

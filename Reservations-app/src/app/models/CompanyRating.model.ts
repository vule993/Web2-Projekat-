export class CompanyRating {
  constructor(
    public id: number,
    public userEmail: string,
    public companyId: string,
    public rating: number
  ) {}
}

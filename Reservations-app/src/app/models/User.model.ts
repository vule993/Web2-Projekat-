export class User {
  constructor(
    public FirstName: string,
    public LastName: string,
    public Email: string,
    public Password: string,
    public Image: string,
    public City: string,
    public PhoneNumber: string,
    public Status: string, //1->head admin 2->car-admin 3->avio-admin 4->user
    public Friends: User[] = []
  ) {}
}

export class User {
  constructor(
    public name: string,
    public surname: string,
    public mail: string,
    public password: string,
    public image: string,
    public city: string,
    public telephone: string,
    public status: string, //1->head admin 2->car-admin 3->avio-admin 4->user
    public friends: User[] = [],
    public id: number = 0
  ) {}
}

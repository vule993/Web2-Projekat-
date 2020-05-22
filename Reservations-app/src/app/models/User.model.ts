export class User {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public mail: string,
    public password: string,
    public image: string,
    public city: string,
    public telephone: string,
    public status: string //0->registrovan korisnik 1->avio-admin 2->rent-a-car admin 3->head admin 4->blok
  ) {}
}

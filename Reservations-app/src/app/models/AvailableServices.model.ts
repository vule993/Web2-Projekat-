export class AvailableService {
  constructor(
    public id: number,
    public icon: string,
    public name: string,
    public status: boolean = true
  ) {}
}

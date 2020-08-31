export class ReservationNotification {
  constructor(
    public id: number,
    public userEmailFrom: string,
    public userEmailTo: string,
    public reservationId: number,
    public message: string,
    public status: number = 0
  ) {}
}

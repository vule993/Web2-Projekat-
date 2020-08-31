using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Reservation
    {
        public long Id { get; set; }
        public virtual AirlineReservation AirlineReservation { get; set; }
        public virtual CarReservation CarReservation { get; set; }
        public string Status { get; set; }         //UNCONFIRMED (tek napravljena)CONFIRMED(prihvacena),CANCELED (otkazana ili odbijena)
                                                              //(ranije znacenje da li je otkazana)
        public bool IsFinished { get; set; }    //da li je zavrsena
    }
}

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
        public AirlineReservation AirlineReservation { get; set; }
        public CarReservation CarReservation { get; set; }
        public bool Taken { get; set; }
        public bool IsFinished { get; set; }
    }
}

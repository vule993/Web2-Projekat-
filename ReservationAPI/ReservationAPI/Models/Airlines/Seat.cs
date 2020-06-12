using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Seat
    {
        public long Id { get; set; }
        public bool Taken { get; set; }
        public Passenger Passenger { get; set; }
        public bool SeatReservationConfirmed { get; set; }
        public int SeatNo { get; set; }
    }
}

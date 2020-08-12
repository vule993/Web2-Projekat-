using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class AirlineReservation
    {
        public long Id { get; set; }
        public virtual Flight Flight { get; set; }

    }
}

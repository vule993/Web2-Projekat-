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
        public virtual Passenger Passenger { get; set; }
        public string DeadlineForCanceling { get; set; }    // popuniti na frontu kako bi se lakse odradilo odjavljivanje leta 3h pre poletanja
        public int SeatNumber { get; set; }
        public int RowNumber { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Passenger
    {
        public long Id { get; set; }
        public virtual UserModel User { get; set; }
        public bool ApprovedAirlineSeat { get; set; }
        public bool ApprovedCarSeat { get; set; }
        
    }
}

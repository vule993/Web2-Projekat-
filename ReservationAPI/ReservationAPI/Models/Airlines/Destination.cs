using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Destination
    {
        public long Id { get; set; }
        public string AirportName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }

    }
}

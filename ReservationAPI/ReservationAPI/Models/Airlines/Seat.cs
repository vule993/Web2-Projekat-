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
        public UserModel User { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
    }
}

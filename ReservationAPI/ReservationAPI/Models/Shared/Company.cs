using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Shared
{
    public class Company
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public string Description { get; set; }

    }
}

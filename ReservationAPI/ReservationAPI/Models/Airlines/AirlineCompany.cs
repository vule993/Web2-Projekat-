using ReservationAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class AirlineCompany
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public string Description { get; set; }
        public List<Destination> Destinations { get; set; }
        public List<Reservation> Flights { get; set; }
        public List<SeatConfiguration> SeatConfigurations { get; set; }
        public long Likes { get; set; }
        public String AdminEmail { get; set; }
    }
}

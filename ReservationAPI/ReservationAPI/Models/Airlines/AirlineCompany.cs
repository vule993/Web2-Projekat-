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
        public virtual Address Address { get; set; }
        public string Description { get; set; }
        public virtual List<Destination> Destinations { get; set; }
        public virtual List<Reservation> Flights { get; set; }
        public virtual List<SeatConfiguration> SeatConfigurations { get; set; }
        public long Likes { get; set; }
        public String AdminEmail { get; set; }
        public int RateNo { get; set; }
        public int RateSum { get; set; }
        public double Rating { get; set; }

        public AirlineCompany()
        {
            Destinations = new List<Destination>();
            Flights = new List<Reservation>();
            SeatConfigurations = new List<SeatConfiguration>();
            RateNo = 0;
            RateSum = 0;
            Rating = 0;
        }
    }
}

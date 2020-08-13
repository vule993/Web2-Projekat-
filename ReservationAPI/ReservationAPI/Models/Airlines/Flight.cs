﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Flight
    {
        public long Id { get; set; }
        public virtual AirlineCompany AvioCompany { get; set; }
        public virtual Destination StartingDestination { get; set; }
        public virtual Destination EndingDestination { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public String EstimationTime { get; set; }
        public String Distance { get; set; }
        public short Discount { get; set; }
        public virtual SeatConfiguration PlaneType { get; set; }
        public virtual List<Destination> Destinations { get; set; }
        public string OtherServices { get; set; }
        public string Price { get; set; }
        public string luggage { get; set; }
    }
}

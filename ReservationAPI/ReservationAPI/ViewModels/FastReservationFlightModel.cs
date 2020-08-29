using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels
{
    public class FastReservationFlightModel
    {
        public long Id { get; set; }
        public Destination StartDestination { get; set; }
        public Destination EndDestination { get; set; }
        public string DateAndTime { get; set; }
        public int SeatNo { get; set; }
        public string Price { get; set; }
        public int Discount { get; set; }
        public string UserEmail { get; set; }
    }
}

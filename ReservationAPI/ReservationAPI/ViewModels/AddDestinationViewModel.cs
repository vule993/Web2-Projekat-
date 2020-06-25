using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels
{
    public class AddDestinationViewModel
    {
        public AirlineCompany Company { get; set; }
        public Destination Destination { get; set; }
    }
}

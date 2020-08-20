using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels.RentACar
{
    public class CarReservationModel
    {
        public long CarId { get; set; }
        public DateTime? EndDate { get; set; }
        public double FullPrice { get; set; }
        public DateTime? StartDate { get; set; }
        public Car Car { get; set; }
        public string UserEmail { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Rent_a_Car
{
    public class CarReservation
    {
        [Key]
        public long Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double FullPrice { get; set; }
        public long CarId { get; set; }
        public virtual Car Car { get; set; }
        public string UserEmail { get; set; }
    }
}

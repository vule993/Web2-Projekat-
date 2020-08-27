using ReservationAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Rent_a_Car
{
    public class Car
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Mark { get; set; }
        public int Year { get; set; }
        public int Seats { get; set; }
        public double Price { get; set; } //per day
        public double Rating { get; set; }
        public string Image { get; set; }
        
        public string Category { get; set; }
        public bool IsReserved { get; set; }
        public virtual ICollection<Rating> Rates { get; set; }

        public Car()
        {
            Rates = new HashSet<Rating>();
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Rent_a_Car
{
    public class CarCompany
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Thumbnail { get; set; }
        public List<Car> Cars { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class CompanyRating
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public int CompanyId { get; set; }
        public int Rating { get; set; }
    }
}

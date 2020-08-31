using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class Discount
    {
        public long Id { get; set; }
        public string Value { get; set; }
        public bool Status { get; set; }
    }
}

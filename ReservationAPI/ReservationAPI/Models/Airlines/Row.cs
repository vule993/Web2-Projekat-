using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Row
    {
        public long Id { get; set; }
        public int RowNo { get; set; }
        public virtual List<Seat> Seats { get; set; }
    }
}

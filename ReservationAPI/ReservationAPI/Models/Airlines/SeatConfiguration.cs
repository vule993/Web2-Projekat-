using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class SeatConfiguration
    {
        public long Id { get; set; }
        public virtual PlaneType PlaneType { get; set; }
        public virtual List<Row> Seats { get; set; }

        public int GetRowWidth()
        {
            return PlaneType.getRowWidth();
        }

    }
}

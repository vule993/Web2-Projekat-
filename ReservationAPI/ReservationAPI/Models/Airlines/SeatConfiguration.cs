using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class SeatConfiguration
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public short SegmentsHeight { get; set; }
        public short segmentsNumber { get; set; }
        public short segmentOneWidth { get; set; }
        public short segmentTwoWidth { get; set; }
        public short segmentThreeWidth { get; set; }
        public short segmentFourWidth { get; set; }
        public virtual List<Row> Seats { get; set; }

       

    }
}

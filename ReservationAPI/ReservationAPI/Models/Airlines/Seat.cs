using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class Seat
    {
        public long Id { get; set; }

        public bool ForFastReservation { get; set; }
        public string SeatStatus { get; set; }          /*  "FREE" or "TAKEN" or "CONFIRMED"  */

        public virtual Passenger Passenger { get; set; }    //??? da li ovde ostaviti passenger-a posto je dodat u airline reservation ili samo staviti 
                                                            //    string FullName radi prikazivanja na hover sedista
        public int SeatNo { get; set; }
    }
}

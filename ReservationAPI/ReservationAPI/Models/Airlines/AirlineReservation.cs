using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class AirlineReservation
    {
        public long Id { get; set; }
        public virtual Flight Flight { get; set; }
        public virtual User Passenger { get; set; }
        public string DeadlineForCanceling { get; set; }    // popuniti na frontu kako bi se lakse odradilo odjavljivanje leta 3h pre poletanja
        public string ConfirmDate { get; set; }             // datum potvrdjivanja leta kako bi se u statistici obradili podaci
        public int SeatNumber { get; set; }                 // broj sedista npr. 0-100
        public int RowNumber { get; set; }                  // broj reda
        public int Rating { get; set; }                  

    }
}

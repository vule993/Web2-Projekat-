using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Shared
{
    public class ReservationNotification
    {
        public long Id { get; set; }
        public string UserEmailFrom { get; set; }
        public string UserEmailTo { get; set; }
        public long ReservationId { get; set; }
        public string Message { get; set; }
        public int Status { get; set; }             //0 nije vidjena, 1 vidjena, 2 resena
    }
}

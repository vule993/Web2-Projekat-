using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Shared
{
    public class Notification
    {
        public long Id { get; set; }
        public virtual UserModel UserToNotify { get; set; }
        public virtual UserModel UserThatNotifies { get; set; }
        public short Status { get; set; }
    }
}

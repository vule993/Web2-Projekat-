using ReservationAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Entities
{
    public class UserFriend
    {
        public string SourceUserId { get; set; }
        public virtual User SourceUser { get; set; }
        public string DestinationUserId { get; set; }
        public virtual User DestinationUser { get; set; }
        public bool Seen { get; set; }
        public bool Accepted { get; set; }
    }
}

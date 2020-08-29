using ReservationAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels
{
    public class InviteFriendModel
    {
        public  UserModel User { get; set; }
        public  string InitiatorsEmail { get; set; }
    }
}

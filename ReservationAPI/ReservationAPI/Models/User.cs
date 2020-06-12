using Microsoft.AspNetCore.Identity;
using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Friends = new List<User>();
        }
        
        [Column(TypeName = "nvarchar(50)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string LastName { get; set; }

        public string Street { get; set; }

        public string City { get; set; }

        public string Image { get; set; }
        public List<User> Friends { get; set; }
        public List<Reservation> Reservations { get; set; }

    }
}

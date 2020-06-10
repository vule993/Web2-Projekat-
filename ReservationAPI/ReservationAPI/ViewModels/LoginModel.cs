using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class LoginModel
    {
        public string Email { get; set; } //email
        public string Password { get; set; }
        public string IdToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class RefreshCred
    {
        public string JwtToken { get; set; }
        public string RefreshToken { get; set; }
    }
}

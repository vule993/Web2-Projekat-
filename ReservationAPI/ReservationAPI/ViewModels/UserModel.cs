using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class UserModel
    {
        //public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Street { get; set; }
        public string Image { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }  //1->head admin 2->car-admin 3->avio-admin 4->user
        public List<UserModel> Friends { get; set; }

    }
}

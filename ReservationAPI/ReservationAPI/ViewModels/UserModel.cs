using Microsoft.AspNetCore.Identity;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class UserModel
    {
        public UserModel()
        {
            Friends = new List<UserModel>();
        }
        public UserModel(User user, String role)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Password = user.PasswordHash;
            City = user.City;
            Street = user.Street;
            Status = role;
            PhoneNumber = user.PhoneNumber;
            Image = user.Image;
            Friends = new List<UserModel>();
            Reservations = user.Reservations;
            PassportNo = user.PassportNo;
        }
        public async Task<bool> PopulateUserModel(User user, UserManager<User> manager, ApplicationDbContext context)
        {
            //var friends = context.Friend.ToList().FindAll(x => x.User1Email == user.Email || x.User2Email == user.Email);
            var allFriends = new List<UserModel>();
            User friendModel = null;
            //foreach(var friend in friends)
            //{
            //    //ako je user1email isti kao ovaj tekuci korisnik koji se logovao uzimam onog drugog(prijatelj)
            //    friendModel = (friend.User1Email == user.Email) ? await manager.FindByEmailAsync(friend.User2Email) : await manager.FindByEmailAsync(friend.User1Email);
            //    allFriends.Add(new UserModel(friendModel, (await manager.GetRolesAsync(friendModel)).FirstOrDefault().ToString()));
            //}

            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Password = user.PasswordHash;
            City = user.City;
            Street = user.Street;
            Status = (await manager.GetRolesAsync(user)).FirstOrDefault().ToString();
            PhoneNumber = user.PhoneNumber;
            Image = user.Image;
            Friends = allFriends;
            Reservations = user.Reservations;
            PassportNo = user.PassportNo;

            return true;
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Street { get; set; }
        public string Image { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }  //1->head admin 2->car-admin 3->avio-admin 4->user
        public virtual List<UserModel> Friends { get; set; }
        public virtual List<Reservation> Reservations { get; set; }
        public string PassportNo { get; set; }

    }
}

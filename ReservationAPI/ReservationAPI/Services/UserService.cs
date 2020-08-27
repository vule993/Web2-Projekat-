using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class UserService : IUserRepository
    {
        private UserManager<User> _userManager;
        private ApplicationDbContext _context;
        private IMailService _emailSender;

        public UserService(UserManager<User> userManager, ApplicationDbContext context, IConfiguration config, IMailService emailSender)
        {
            _userManager = userManager;
            _context = context;
            _emailSender = emailSender;
        }

        public async Task<object> AddFriend(AddFriendViewModel newFriends)
        {
            var user = await _userManager.FindByEmailAsync(newFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(newFriends.FriendsEmail);

            if (!user.Friends.Contains(friend))
            {
                user.Friends.Add(friend);
            }

            if (!friend.Friends.Contains(user))
            {
                friend.Friends.Add(user);
            }

            await _context.SaveChangesAsync();

            return new { Message = "Friend successfully added!" };

        }

        public async Task<bool> ConfirmEmail(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return false;

            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            return true;
        }

        public async Task<object> Get(string email)
        {
            UserModel um;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return (new { message = "User does not exist." });

            var role = await _userManager.GetRolesAsync(user);
            List<UserModel> friends = new List<UserModel>();

            foreach (var friend in user.Friends)
            {

                um = new UserModel()
                {
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Email = friend.Email,
                    Password = friend.PasswordHash,
                    City = friend.City,
                    Street = friend.Street,
                    Status = role.ToString(),
                    PhoneNumber = friend.PhoneNumber,
                    Image = friend.Image,
                    Friends = new List<UserModel>(),         //prijatelji nece moci da vide prijatelje prijatelja
                    Reservations = friend.Reservations
                };

                friends.Add(um);
            }

            var userModel = new UserModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.PasswordHash,
                City = user.City,
                Street = user.Street,
                Status = role.FirstOrDefault(),
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                Friends = friends

            };

            return userModel;
        }

        public async Task<List<UserModel>> GetAll()
        {
            var users = _context.Users.ToList();

            List<UserModel> allUsers = new List<UserModel>();
            UserModel u;
            foreach (var user in users)
            {
                var role = await _userManager.GetRolesAsync(user);
                var status = role.FirstOrDefault().ToString();
                u = new UserModel()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Password = user.PasswordHash,
                    Street = user.Street,
                    City = user.City,
                    Status = status,
                    Image = user.Image,
                    Friends = new List<UserModel>(),
                    Reservations = user.Reservations
                };
                allUsers.Add(u);
            }

            return allUsers;
        }

        public async Task<object> GetAllFriends(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            List<UserModel> friends = new List<UserModel>();

            if(user == null)
            {
                return null;
            }

            foreach (var friend in user.Friends)
            {
                var role = await _userManager.GetRolesAsync(friend);

                friends.Add(new UserModel()
                {
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Email = friend.Email,
                    Street = friend.Street,
                    Image = friend.Image,
                    City = friend.City,
                    PhoneNumber = friend.PhoneNumber,
                    Status = role.FirstOrDefault().ToString()
                });
            }

            return friends;
        }


        public async Task<object> RemoveFriend(AddFriendViewModel unFriends)
        {
            var user = await _userManager.FindByEmailAsync(unFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(unFriends.FriendsEmail);


            if (user.Friends.Contains(friend))
            {
                user.Friends.Remove(friend);
            }

            if (friend.Friends.Contains(user))
            {
                friend.Friends.Remove(user);
            }


            await _context.SaveChangesAsync();

            return new { Message = "Friend successfully removed!" };

        }

        public Task SendEmail(string email)
        {
            string subject = "Please confirm your Email";
            string body = $"<p>For: {email}</p><a href=\"http://localhost:4200/ConfirmEmail/{email}\">Confirm Email</a>";

            return _emailSender.SendEmailAsync(email, subject, body);
        }

        public async Task<object> Update(int id, UserModel userModel)
        {
            //var user = await _userManager.FindByNameAsync(model.Email); dobavljanje bilo kog usera

            //dobavljanje logovanog usera
            //string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByEmailAsync(userModel.Email);

            if (user != null)
            {
                if (userModel.FirstName != "")
                    user.FirstName = userModel.FirstName;
                if (userModel.LastName != "")
                    user.LastName = userModel.LastName;
                if (userModel.Email != "")
                    user.Email = userModel.Email;
                if (userModel.PhoneNumber != "")
                    user.PhoneNumber = userModel.PhoneNumber;
                if (userModel.Street != "")
                    user.Street = userModel.Street;
                if (userModel.City != "")
                    user.City = userModel.City;
                if (userModel.Image != "")
                    user.Image = userModel.Image;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return user;
            }

            return (new { message = "Update error" });
        }
    }
}

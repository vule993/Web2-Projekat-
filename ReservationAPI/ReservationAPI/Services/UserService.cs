using Microsoft.AspNetCore.Http;
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
using System.Security.Claims;
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

        public async Task<object> AddFriend(AddFriendModel newFriends)
        {
            var user1 = await _userManager.FindByEmailAsync(newFriends.UsersEmail);
            var user2 = await _userManager.FindByEmailAsync(newFriends.FriendsEmail);

            var friends = _context.Friend.ToList().Find(x => x.User1Email == user1.Email && x.User2Email == user2.Email);

            if (friends != null)
            {
                return new { Message = "You are already friends!" };
            }

            _context.Friend.Add(
                new Friend() {
                    User1Email = user1.Email,
                    User2Email = user2.Email
                });

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
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return (new { message = "User does not exist." });

            var role = await _userManager.GetRolesAsync(user);

            //ovde su sve veze iz koje treba izvaditi korisnike kao user modele
            List<Friend> friends = _context.Friend.ToList().FindAll(x => x.User1Email == user.Email || x.User2Email == user.Email);

            //Lista koju vracam
            List<UserModel> friendsToReturn = new List<UserModel>();

            foreach (var friend in friends)
            {
                String friendsEmail = "";
                //onda je email prijatelja user2
                if (friend.User1Email == user.Email)
                {
                    friendsEmail = friend.User2Email;
                }
                //onda je email prijatelja user1
                if (friend.User2Email == user.Email)
                {
                    friendsEmail = friend.User1Email;
                }

                User friendInfo = _context.Users.ToList().Find(x => x.Email == friendsEmail);
                friendsToReturn.Add(
                        new UserModel()
                        {
                            FirstName = friendInfo.FirstName,
                            LastName = friendInfo.LastName,
                            Email = friendInfo.Email,
                            Password = friendInfo.PasswordHash,
                            City = friendInfo.City,
                            Street = friendInfo.Street,
                            Status = role.ToString(),
                            PhoneNumber = friendInfo.PhoneNumber,
                            Image = friendInfo.Image,
                            Friends = new List<UserModel>(),         //prijatelji nece moci da vide prijatelje prijatelja
                            Reservations = friendInfo.Reservations,
                            PassportNo = friendInfo.PassportNo
                        }
                    );
            }

            UserModel userModel = new UserModel()
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
                Friends = friendsToReturn,
                PassportNo = user.PassportNo

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
                    Reservations = user.Reservations,
                    PassportNo = user.PassportNo
                };
                allUsers.Add(u);
            }

            return allUsers;
        }

        public async Task<List<UserModel>> GetAllFriends(string email, User loggedUser)
        {
            
            List<UserModel> allFriends = new List<UserModel>();
            List<Friend> friendLinks = _context.Friend.ToList().FindAll(x => x.User1Email == email || x.User2Email == email);
            

            foreach(var friendLink in friendLinks)
            {
                var friend = (friendLink.User1Email == loggedUser.Email) ? await _userManager.FindByEmailAsync(friendLink.User2Email) : await _userManager.FindByEmailAsync(friendLink.User1Email);
                var role = (await _userManager.GetRolesAsync(friend)).FirstOrDefault().ToString();
                allFriends.Add(new UserModel(friend, role));
            }
            return allFriends;
        }

        public async Task<object> RemoveFriend(AddFriendModel unFriends)
        {
            User user = await _userManager.FindByEmailAsync(unFriends.UsersEmail);
            User friend = await _userManager.FindByEmailAsync(unFriends.FriendsEmail);

            Friend friendToRemove = _context
                .Friend
                .ToList()
                .Find(
                    x => x.User1Email == user.Email && x.User2Email == friend.Email ||
                    x.User1Email == friend.Email && x.User2Email == user.Email
                );

            _context.Friend.Remove(friendToRemove);

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
                if (userModel.PassportNo != "")
                    user.PassportNo = userModel.PassportNo;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return user;
            }

            return (new { message = "Update error" });
        }
    }
}

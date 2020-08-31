﻿using Microsoft.AspNetCore.Identity;
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

        public async Task<object> AddFriend(AddFriendModel newFriends)
        {
            var user = await _userManager.FindByEmailAsync(newFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(newFriends.FriendsEmail);

            foreach(var currFriend in user.Friends)
            {
                if(currFriend.Email == friend.Email)
                {
                    return new { Message = "You are already friends!" };
                }
            }

            user.Friends.Add(new Friend() { 
                Email = friend.Email
            });





            foreach (var currFriend in friend.Friends)
            {
                if (currFriend.Email == user.Email)
                {
                    return new { Message = "You are already friends!" };
                }
            }
            friend.Friends.Add(new Friend()
            {
                Email = user.Email
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
            UserModel um;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return (new { message = "User does not exist." });

            var role = await _userManager.GetRolesAsync(user);
            List<UserModel> friends = new List<UserModel>();

            User friend;

            foreach (var friendModel in user.Friends)
            {
                friend = await _userManager.FindByEmailAsync(friendModel.Email);
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
                    Reservations = friend.Reservations,
                    PassportNo = friend.PassportNo
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
                Friends = friends,
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

        public async Task<object> GetAllFriends(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            List<UserModel> friends = new List<UserModel>();

            if(user == null)
            {
                return null;
            }

            User friend;
            var generatedId = 0;

            foreach (var friendModel in user.Friends)
            {
                friend = await _userManager.FindByEmailAsync(friendModel.Email);
                var role = await _userManager.GetRolesAsync(friend);

                friends.Add(new UserModel()
                {
                    Id = ++generatedId,
                    FirstName = friend.FirstName,
                    LastName = friend.LastName,
                    Email = friend.Email,
                    Street = friend.Street,
                    Image = friend.Image,
                    City = friend.City,
                    PhoneNumber = friend.PhoneNumber,
                    Status = role.FirstOrDefault().ToString(),
                    PassportNo = friend.PassportNo
                });
            }

            return friends.OrderByDescending(f => f.Id).ToList();
        }


        public async Task<object> RemoveFriend(AddFriendModel unFriends)
        {
            var user = await _userManager.FindByEmailAsync(unFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(unFriends.FriendsEmail);


            foreach (var currFriend in user.Friends)
            {
                if (currFriend.Email == friend.Email)
                {
                    user.Friends.Remove(currFriend);
                }
            }


            foreach (var currFriend in friend.Friends)
            {
                if (currFriend.Email == user.Email)
                {
                    friend.Friends.Remove(currFriend);
                }
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

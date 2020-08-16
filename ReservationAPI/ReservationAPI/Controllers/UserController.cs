﻿using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.ViewModels;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private readonly ApplicationSettings _appSettings;
        private ApplicationDbContext _context;
        private IMailService _emailSender;

        public UserController(UserManager<User> userManager, ApplicationDbContext context, IConfiguration config, IOptions<ApplicationSettings> appSettings, IMailService emailSender)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _context = context;
            _emailSender = emailSender;
        }


        #region Register and login operations

        //POST : /api/User/Register
        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<Object> PostUser(UserModel model)
        {
            model.Status = "User";
            //model.Status = "Admin";
            var newUser = new User()
            {
                UserName = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                Street = model.Street,
                City = model.City,
                Image = model.Image,
                Friends = new List<User>(),
                Reservations = new List<Reservation>()
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);

                if (result.Succeeded)
                {
                    var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                    string subject = "Confirm Email";
                    string body = $"<p>For: {model.Email}</p><a href=\"http://localhost:4200/ConfirmEmail/{model.Email}\">Confirm Email</a>";

                    await SendEmail(newUser.Email);
                }

                var roleResult = await _userManager.AddToRoleAsync(newUser, model.Status);

                return Ok(result);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in registering new user. -> {ex.Message}");
                throw ex;
            }
        }

        //POST : /api/User/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            //use usemanager to check if we have user with given username
            var user = await _userManager.FindByNameAsync(model.Email);






            //zakomentarisano za potrebe testiranja




            //if (!user.EmailConfirmed)
            //{
            //    return BadRequest(new { Message = "Email is not confirmed!" });
            //}

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //check for roles of this user
                var role = await _userManager.GetRolesAsync(user); //put this role to the claims
                IdentityOptions options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{
                        new Claim("UserID", user.Email),
                        new Claim(options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),

                    Expires = DateTime.UtcNow.AddDays(1), //after 1 day

                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
                            SecurityAlgorithms.HmacSha256Signature)
                };


                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token, user.Email });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }


        //social login
        //POST: api/User/SocialLogin
        [HttpPost]
        [Route("SocialLogin")]
        public async Task<IActionResult> SocialLogin([FromBody] LoginModel loginModel)
        {
            var validation = await VerifyTokenAsync(loginModel.IdToken);

            if (validation.isVaild)
            {
                //get user
                var socialUser = await _userManager.FindByNameAsync(validation.apiTokenInfo.email);

                if (socialUser == null)
                {
                    var newUser = new User()
                    {
                        Email = socialUser.Email,
                        FirstName = loginModel.FirstName,
                        LastName = loginModel.LastName

                    };

                    await _context.Users.AddAsync(newUser);
                    await _context.SaveChangesAsync();
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{
                        new Claim("UserID", socialUser.Email),

                    }),
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    SigningCredentials = new SigningCredentials(
                   new SymmetricSecurityKey(
                           Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
                           SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }

            return Ok();

        }


        public async Task<(bool isVaild, GoogleApiTokenInfo apiTokenInfo)> VerifyTokenAsync(string providerToken)
        {
            var httpClient = new HttpClient();
            string GoogleApiTokenInfo = $"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={providerToken}";
            var requestUri = new Uri(string.Format(GoogleApiTokenInfo, providerToken));

            HttpResponseMessage responseMessage;

            try
            {
                responseMessage = await httpClient.GetAsync(requestUri);
            }
            catch (Exception)
            {
                return (false, null);
            }

            if (responseMessage.StatusCode != HttpStatusCode.OK)
            {
                return (false, null);
            }

            var response = await responseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);
            return (true, googleApiTokenInfo);
        }

        //GET: /api/User/GetAll
        [HttpGet]
        ////[Authorize]
        ////[Authorize(Roles = "Admin")]
        [Route("getall")]
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


        // api/User/ConfirmEmail
        [HttpPost]
        [Route("ConfirmEmail")]
        public async Task<object> ConfirmEmail(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return BadRequest(new { Message = "Incorrect email." });

            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        #endregion

        #region Basic Crud operations on User

        //GET /api/User/id -> id=email
        [HttpGet("{id}")]
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

            return Ok(userModel);
        }


        //api/User/Update/id
        [HttpPut("{id}")]
        [Route("Update")]
        public async Task<object> Update(int id, [FromBody] UserModel userModel)
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

                try
                {
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch(DbException dex)
                {
                    Console.WriteLine($"ERROR with updating user. -> {dex.Message}");
                }
                
                return Ok(user);
            }

            return (new { message = "Update error" });

        }



        //GET: /api/User/Profile
        [HttpGet]
        [Authorize]
        [Route("Profile")]
        public async Task<Object> GetUserProfile()
        {
            //auth user -> need to access UserID from claims...

            string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByEmailAsync(userID);  //userID je zapravo email u claimsu...

            //var user = await _userManager.FindByNameAsync(model.Email);
            var role = await _userManager.GetRolesAsync(user);

            List<UserModel> friends = new List<UserModel>();
            UserModel um;


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
                    Status = role.FirstOrDefault().ToString(),
                    PhoneNumber = friend.PhoneNumber,
                    Image = friend.Image,
                    Friends = new List<UserModel>(),         //prijatelji nece moci da vide prijatelje prijatelja
                    Reservations = friend.Reservations
                };

                friends.Add(um);

            }

            UserModel returnUser = new UserModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.PasswordHash,
                City = user.City,
                Street = user.Street,
                Status = role.FirstOrDefault().ToString(),
                PhoneNumber = user.PhoneNumber,
                Image = user.Image,
                Friends = friends
            };

            return returnUser;

        }

        #endregion

        [HttpGet]
        [Route("Friends/{email}")]
        public async Task<object> GetAllFriends(String email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            List<UserModel> friends = new List<UserModel>();

            foreach(var friend in user.Friends)
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
                }) ;
            }

            return friends;
        }


        [HttpPut]
        [Route("AddFriend")]
        public async Task<object> AddFriend(AddFriendViewModel newFriends)
        {
            var user = await _userManager.FindByEmailAsync(newFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(newFriends.FriendsEmail);

            try
            {

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
            catch(Exception e)
            {
                return new { Message = "Friend unsuccessfully added!" };
            }

        }


        [HttpPut]
        [Route("RemoveFriend")]
        public async Task<object> RemoveFriend(AddFriendViewModel unFriends)
        {
            var user = await _userManager.FindByEmailAsync(unFriends.UsersEmail);
            var friend = await _userManager.FindByEmailAsync(unFriends.FriendsEmail);

            try
            {

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
            catch (Exception e)
            {
                return new { Message = "Friend unsuccessfully removed!" };
            }

        }

        //***************** HELPERS ******************

        private Task SendEmail(string email)
        {
            string subject = "Please confirm your Email";
            string body = $"<p>For: {email}</p><a href=\"http://localhost:4200/ConfirmEmail/{email}\">Confirm Email</a>";

            return _emailSender.SendEmailAsync(email, subject, body);
        }
    }
}

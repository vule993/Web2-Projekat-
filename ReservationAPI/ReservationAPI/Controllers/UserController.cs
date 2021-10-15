using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
using ReservationAPI.DTOs;
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
        private readonly IMapper _mapper;
        private IUserRepository _userService;

        public UserController(
            IUserRepository userRepository, 
            UserManager<User> userManager, 
            ApplicationDbContext context, 
            IConfiguration config, 
            IOptions<ApplicationSettings> appSettings,
            IMapper mapper)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _context = context;
            _mapper = mapper;
            _userService = userRepository;
        }

        #region Register and login operations
        //POST : /api/User/Register
        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<ActionResult<UserDTO>> PostUser(UserModel model)
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
                Reservations = new List<Reservation>(),
                PassportNo = model.PassportNo
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);

                if (result.Succeeded)
                {
                    var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                    await SendEmail(newUser.Email);
                }

                var roleResult = await _userManager.AddToRoleAsync(newUser, model.Status);

                return Ok(result);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in registering new user. -> {ex.Message}");
                throw;
            }
        }



        //POST : /api/User/Register
        [HttpPost]
        [AllowAnonymous]
        [Route("RegisterGuest")]
        public async Task<Object> PostGuest(InviteFriendModel request)
        {
            request.User.Status = "Guest";
       
            var newUser = new User()
            {
                UserName = request.User.Email,
                FirstName = request.User.FirstName,
                LastName = request.User.LastName,
                Email = request.User.Email,
                PhoneNumber = request.User.PhoneNumber,
                Street = request.User.Street,
                City = request.User.City,
                Image = request.User.Image,
                //Friends = new List<Friend>(),
                Reservations = new List<Reservation>(),
                PassportNo = request.User.PassportNo
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, request.User.Password);

                //?????
                if (result.Succeeded)
                {
                    var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                    await SendEmail(newUser.Email);
                }

                var roleResult = await _userManager.AddToRoleAsync(newUser, request.User.Status);


                //mutual add friends

                await _userService.AddFriend(new AddFriendModel()
                {
                    UsersEmail = request.User.Email,
                    FriendsEmail = request.InitiatorsEmail
                });





                return Ok(result);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR in registering new guest. -> {ex.Message}");
                return null;
            }
        }


        //POST : /api/User/Login
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null) return Unauthorized("Please check your credentials.");
            if (!user.EmailConfirmed) return BadRequest(new { Message = "Email is not confirmed!" });

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var role = await _userManager.GetRolesAsync(user);

                IdentityOptions options = new();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{
                        new Claim("UserID", user.Email),
                        new Claim(options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)),
                            SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                //var userModel = new UserModel();
                //await userModel.PopulateUserModel(user, _userManager, _context);
                var userDTO = new UserDTO();
                _mapper.Map(user, userDTO);
                userDTO.Token = token;


                return Ok(userDTO);
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
                var role = await _userManager.GetRolesAsync(socialUser);
                IdentityOptions options = new();

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
                        new Claim(options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
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

                return Ok(new { token, socialUser });
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


        // api/User/ConfirmEmail
        [HttpPost]
        [Route("ConfirmEmail")]
        public async Task<object> ConfirmEmail(LoginModel model)
        {
            try
            {
                if (await _userService.ConfirmEmail(model))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new { Message = "Error while confirming email." });
                }
            }
            catch(Exception e)
            {
                return BadRequest(new { Message = $"Error while confirming email. [{e.Message}]" });
            }
        }

        private Task SendEmail(string email)
        {
            return _userService.SendEmail(email);
        }

        //GET: /api/User/Profile
        //[HttpGet]
        //[Authorize]
        //[Route("Profile")]
        //public async Task<Object> GetUserProfile()
        //{
        //    //auth user -> need to access UserID from claims...

        //    //string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
        //    //var user = await _userManager.FindByEmailAsync(userID);  //userID je zapravo email u claimsu...

        //    //var role = await _userManager.GetRolesAsync(user);

        //    //List<UserModel> friends = new List<UserModel>();
        //    //UserModel um;

        //    //User friend;

        //    //foreach (var friendModel in user.Friends)
        //    //{
        //    //    friend = await _userManager.FindByEmailAsync(friendModel.Email);

        //    //    um = new UserModel()
        //    //    {
        //    //        FirstName = friend.FirstName,
        //    //        LastName = friend.LastName,
        //    //        Email = friend.Email,
        //    //        Password = friend.PasswordHash,
        //    //        City = friend.City,
        //    //        Street = friend.Street,
        //    //        Status = role.FirstOrDefault().ToString(),
        //    //        PhoneNumber = friend.PhoneNumber,
        //    //        Image = friend.Image,
        //    //        Friends = new List<UserModel>(),         //prijatelji nece moci da vide prijatelje prijatelja
        //    //        Reservations = friend.Reservations,
        //    //        PassportNo = friend.PassportNo
        //    //    };

        //    //    friends.Add(um);

        //    //}

        //    //UserModel returnUser = new UserModel()
        //    //{
        //    //    FirstName = user.FirstName,
        //    //    LastName = user.LastName,
        //    //    Email = user.Email,
        //    //    Password = user.PasswordHash,
        //    //    City = user.City,
        //    //    Street = user.Street,
        //    //    Status = role.FirstOrDefault().ToString(),
        //    //    PhoneNumber = user.PhoneNumber,
        //    //    Image = user.Image,
        //    //    Friends = friends,
        //    //    PassportNo = user.PassportNo
        //    //};

        //    //return returnUser;
        //    return null;

        //}

        #endregion


        #region Basic Crud operations on User

        //GET /api/User/id -> id=email
        [HttpGet("{id}")]
        public async Task<object> Get(string email)
        {
            try
            {
                return await _userService.Get(email);
            }
            catch(Exception e)
            {
                return new { Message = $"ERROR [{e.Message}]" };
            }
        }


        //GET: /api/User/GetAll
        [HttpGet]
        ////[Authorize]
        ////[Authorize(Roles = "Admin")]
        [Route("getall")]
        public async Task<List<UserModel>> GetAll()
        {
            try
            {
                return await _userService.GetAll();
            }
            catch
            {
                return new List<UserModel>();
            }
        }

        //api/User/Update/id
        [HttpPut("{id}")]
        [Route("Update")]
        public async Task<object> Update(int id, [FromBody] UserModel userModel)
        {
            try
            {
                return await _userService.Update(id, userModel);
            }
            catch(Exception e)
            {
                return new { Message = $"ERROR while updating user. [{e.Message}]" };
            }

        }


        #endregion


        #region Friend operations
        [HttpGet]
        [Route("Friends/{email}")]
        public async Task<object> GetAllFriends(String email)
        {
            try
            {
                string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
                var loggedUser = await _userManager.FindByEmailAsync(userID);  //userID je zapravo email u claimsu...
                return await _userService.GetAllFriends(email, loggedUser);
            }
            catch(Exception e)
            {
                return new {Message = $"ERROR: [{e.Message}]"};
            }
        }


        [HttpPut]
        [Route("AddFriend")]
        public async Task<object> AddFriend(AddFriendModel newFriends)
        {
            try
            {
                return await _userService.AddFriend(newFriends);
            }
            catch(Exception e)
            {
                return BadRequest(new { Message = $"Error while adding new friend. [{e.Message}]" });
            }

        }


        [HttpPut]
        [Route("RemoveFriend")]
        public async Task<object> RemoveFriend(AddFriendModel unFriends)
        {
            try
            {
                return await _userService.RemoveFriend(unFriends);
            }
            catch(Exception e)
            {
                return new { Message = $"Friend unsuccessfully removed! [{e.Message}]" };
            }
        }
        #endregion
        //***************** HELPERS ******************


    }
}

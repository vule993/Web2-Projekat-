using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.ViewModels;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private ApplicationDbContext _context;

        public UserController(UserManager<User> userManager, ApplicationDbContext context, SignInManager<User> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        //POST : /api/User/Register
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostUser(UserModel model)
        {
            //model.Status = "Admin";
            model.Status = "User";
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
                await _userManager.AddToRoleAsync(newUser, model.Status);
                return Ok(result);

            }
            catch (Exception ex)
            {
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
            var test = _appSettings.JWT_Secret;
            var validation = await VerifyTokenAsync(loginModel.IdToken);

            if (validation.isVaild)
            {
                //get user
                var socialUser = await _userManager.FindByNameAsync(validation.apiTokenInfo.email);

                //da li ovde dodavati usera ako ne postoji?
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
                        new Claim("UserID", socialUser.Email), //moram ovo napraviti
                        
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


        /*
         OVDE GLEDAJ
        */


        //api/User/Update/id
        [HttpPut("{id}")]
        [Route("Update")]
        public async Task<object> Update(int id,[FromBody]UserModel userModel)
        {
            //var user = await _userManager.FindByNameAsync(model.Email); dobavljanje bilo kog usera

            //dobavljanje logovanog usera
            //string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByEmailAsync(userModel.Email);
            

            if(user != null)
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
                return Ok(user);
            }

            return (new { message = "Update error" });

        }



        /*
         OVDE GLEDAJ
        */



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
    }
}

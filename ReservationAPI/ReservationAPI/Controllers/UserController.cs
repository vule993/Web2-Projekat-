using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;

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
                 Image = model.Image
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                await _userManager.AddToRoleAsync(newUser, model.Status);
                return Ok(result);

            }catch(Exception ex)
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
            var user = await _userManager.FindByNameAsync(model.UserName);

            if(user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //check for roles of this user
                var role = await _userManager.GetRolesAsync(user); //put this role to the claims
                IdentityOptions options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{ 
                        new Claim("UserID", user.Id.ToString()),
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

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }


        //GET: /api/User/GetAll
        [HttpGet]
        //[Authorize]
        //[Authorize(Roles = "Admin")]
        [Route("GetAll")]
        public IEnumerable<UserModel> GetAll()
        {
            var users = _context.Users.ToList();
            return users.Select(u => new UserModel()
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                Password = u.PasswordHash,
                Street = u.Street,
                City = u.City,
                Status = "User",
                Image = u.Image
            }).ToList();
        }

        //GET: /api/User/Profile
        [HttpGet]
        [Authorize]
        [Route("Profile")]
        public async Task<Object> GetUserProfile()
        {
            //auth user -> need to access UserID from claims...

            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userID);
            var role = await _userManager.GetRolesAsync(user);
            
            UserModel returnUser = new UserModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.PasswordHash,
                City = user.City,
                Street = user.Street,
                Status = role.ToString(),
                PhoneNumber = user.PhoneNumber,
                Image = user.Image

            };

            return returnUser;

        }
    }
}

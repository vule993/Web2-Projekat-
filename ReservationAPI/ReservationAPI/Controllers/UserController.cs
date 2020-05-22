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

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        //POST : /api/User/Register
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostUser(UserModel model)
        {
            var newUser = new User()
            {
                 UserName = model.FirstName,
                 FirstName = model.FirstName,
                 LastName = model.LastName,
                 Email = model.Email,
                 PhoneNumber = model.Phone,
                 Street = model.Street,
                 City = model.City
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
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
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]{ new Claim("UserID", user.Id.ToString())}),

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



        //GET: /api/User/Profile
        [HttpGet]
        [Authorize]
        [Route("Profile")]
        public async Task<Object> GetUserProfile()
        {
            //auth user -> need to access UserID from claims...

            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userID);

            return new
            {
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email,
                user.Street,
                user.City,
                user.PhoneNumber,
               
            };

        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private readonly ApplicationDbContext _context;

        public AdminController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        //POST : /api/Admin/RegisterCarAdmin
        [HttpPost]
        [Route("RegisterCarAdmin")]
        public async Task<Object> RegisterCarAdmin(UserModel model)
        {
            model.Status = "CarAdmin";

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
                
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                await _userManager.AddToRoleAsync(newUser, "CarAdmin"); //proveri role
                _context.Users.Add(newUser);

                return Ok(result);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }


        //POST : /api/Admin/RegisterAvioAdmin
        [HttpPost]
        [Route("RegisterAvioAdmin")]
        public async Task<Object> RegisterAvioAdmin(UserModel model)
        {
            model.Status = "AvioAdmin";

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
                
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                await _userManager.AddToRoleAsync(newUser, "AvioAdmin");
                _context.Users.Add(newUser);
                return Ok(result);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }


        [HttpGet]
        [Authorize(Roles = "CarAdmin")]
        [Route("CarAdmin")]
        public string GetCarAdmin()
        {
            return "Car admin details";
        }

        [HttpPut("{id}")]
        [Route("ChangeDetails")]
        public async Task<object> ChangeDetails(string id, [FromBody] User admin)
        {
            var a = await _userManager.FindByEmailAsync(admin.Email);
            a.Email = id;

            if(a != null)
            {
                a.FirstName = admin.FirstName;
                a.LastName = admin.LastName;
                a.Email = admin.Email;
                a.City = admin.City;
                a.Friends = admin.Friends;
                a.Image = admin.Image;
                //a.PasswordHash = admin.PasswordHash;
                a.PhoneNumber = admin.PhoneNumber;
                a.Street = admin.Street;
                a.UserName = admin.Email;
 
                _context.Users.Update(a);
                await _context.SaveChangesAsync();

                return Ok(a);
            }

            return (new { message = "This user does not exist in database." });

        }
    }
}

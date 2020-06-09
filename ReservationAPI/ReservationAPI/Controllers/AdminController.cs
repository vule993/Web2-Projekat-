using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        public AdminController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                FirstName = model.Name,
                LastName = model.Surname,
                Email = model.Email,
                PhoneNumber = model.Telephone,
                Street = model.Street,
                City = model.City,
                Image = model.Image,
                
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


        //POST : /api/Admin/RegisterAvioAdmin
        [HttpPost]
        [Route("RegisterAvioAdmin")]
        public async Task<Object> RegisterAvioAdmin(UserModel model)
        {
            model.Status = "AvioAdmin";

            var newUser = new User()
            {
                UserName = model.Email,
                FirstName = model.Name,
                LastName = model.Surname,
                Email = model.Email,
                PhoneNumber = model.Telephone,
                Street = model.Street,
                City = model.City,
                Image = model.Image
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


        [HttpGet]
        [Authorize(Roles = "CarAdmin")]
        [Route("CarAdmin")]
        public string GetCarAdmin()
        {
            return "Car admin details";
        }


    }
}

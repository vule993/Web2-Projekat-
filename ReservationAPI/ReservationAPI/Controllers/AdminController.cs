using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.Models.Shared;
using ReservationAPI.ViewModels;

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
                Id = null,
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
                newUser.Id = Guid.NewGuid().ToString();
                var result = await _userManager.CreateAsync(newUser, model.Password);
                await _userManager.AddToRoleAsync(newUser, "CarAdmin"); //proveri role

                //await _context.SaveChangesAsync();
                return Ok(newUser);

            }
            catch (DbUpdateException ex)
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
                Id = null,
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
                newUser.Id = Guid.NewGuid().ToString();
                var result = await _userManager.CreateAsync(newUser, model.Password);

                await _userManager.AddToRoleAsync(newUser, "AvioAdmin");
                //await _context.SaveChangesAsync();
                return Ok(newUser);

            }
            catch (DbUpdateException ex)
            {
                throw ex;

            }
        }




        [HttpPut("{id}")]
        [Route("ChangeDetails")]
        public async Task<object> ChangeDetails(string id, [FromBody] User admin)
        {
            var a = await _userManager.FindByEmailAsync(admin.Email);
            a.Email = id;

            if (a != null)
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


        [HttpPost]
        [Route("CreateAvioCompany")]
        public async Task<Object> CreateAvioCompany([FromBody] AirlineCompany airlineCompany)
        {
            var admin = await _userManager.FindByEmailAsync(airlineCompany.Admin.Email);

            if (admin == null)
            {
                var adminModel = new UserModel()
                {
                    FirstName = airlineCompany.Admin.FirstName,
                    LastName = airlineCompany.Admin.LastName,
                    Email = airlineCompany.Admin.Email,
                    City = airlineCompany.Admin.City,
                    PhoneNumber = airlineCompany.Admin.PhoneNumber,
                    Street = airlineCompany.Admin.Street,
                };

                airlineCompany.Admin = adminModel;
            }

            //mora prvo adresa jer je povezano preko kljuca
            Address adresa = new Address()
            {
                City = airlineCompany.Address.City,
                Country = airlineCompany.Address.Country,
                Street = airlineCompany.Address.Street
            };


            _context.Address.Add(adresa);
        

            AirlineCompany newCompany = new AirlineCompany()
            {
                Admin = airlineCompany.Admin,
                Name = airlineCompany.Name,
                Address = adresa,
                Description = airlineCompany.Description,
                likes = airlineCompany.likes

            };

            _context.AirlineCompany.Add(newCompany);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                throw new DbUpdateConcurrencyException("Greska pri dodavanju avio kompanije", ex);
            }

            return Ok(newCompany);
        }


        [HttpPost]
        [Route("CreateCarCompany")]
        public async Task<Object> CreateCarCompany([FromBody] CarCompanyModel model)
        {
            var admin = await _userManager.FindByEmailAsync(model.Admin.Email);

            if (admin == null)
            {
                var adminModel = new UserModel()
                {
                    FirstName = model.Admin.FirstName,
                    LastName = model.Admin.LastName,
                    Email = model.Admin.Email,
                    City = model.Admin.City,
                    PhoneNumber = model.Admin.PhoneNumber,
                    Street = model.Admin.Street,
                };

                model.Admin = adminModel;
            }

            //new company
            CarCompany carCompany = new CarCompany()
            {
                Admin = model.Admin,
                Address = model.Address,
                Cars = new List<Car>(),
                City = model.City,
                Description = model.Description,
                Name = model.Name,
                Rating = 0,
                Thumbnail = ""
            };


            try
            {
                _context.CarCompanies.Add(carCompany);
                await _context.SaveChangesAsync();
            }
            catch (DbException ex)
            {
                Console.WriteLine("Error with creating new car company: " + ex.ErrorCode);
            }

            return Ok(carCompany);
        }

    }
}

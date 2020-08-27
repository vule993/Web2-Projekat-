using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
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
        private readonly ApplicationDbContext _context;
        private ICarCompany _carCompanyRepository;

        public AdminController(UserManager<User> userManager, ApplicationDbContext context, ICarCompany carCompanyRepo)
        {
            _userManager = userManager;
            _context = context;
            _carCompanyRepository = carCompanyRepo;
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
            catch (DbException dex)
            {
                Console.WriteLine($"ERROR with registering car admin. -> {dex.Message}");
                throw dex;

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
                Friends = new List<User>(),
                Reservations = new List<Reservation>()
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, model.Password);
                var roleResult = await _userManager.AddToRoleAsync(newUser, model.Status);

                return Ok(result);

            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"ERROR in registering new user. -> {ex.Message}");
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
        [Route("CreateAirlineCompany")]
        public async Task<Object> CreateAirlineCompany([FromBody] AirlineCompany airlineCompany)
        {

            Address address = new Address()
            {
                City = airlineCompany.Address.City,
                Country = airlineCompany.Address.Country,
                Street = airlineCompany.Address.Street,
                Lat = airlineCompany.Address.Lat,
                Lon = airlineCompany.Address.Lon
            };
            _context.Address.Add(address);


            AirlineCompany newCompany = new AirlineCompany()
            {

                Name = airlineCompany.Name,
                Address = address,
                Description = airlineCompany.Description,
                Destinations = new List<Destination>(),
                Flights = new List<Reservation>(),
                SeatConfigurations = new List<SeatConfiguration>(),
                Likes = airlineCompany.Likes,
                AdminEmail = airlineCompany.AdminEmail

            };


            try
            {
                _context.AirlineCompany.Add(newCompany);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Console.WriteLine($"ERROR with adding new airline company. -> {dex.Message}");
                throw new DbUpdateConcurrencyException("Greska pri dodavanju avio kompanije", dex);
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
                Admin = admin.Email,
                Address = model.Address,
                Cars = new List<Car>(),
                City = model.City,
                Description = model.Description,
                Name = model.Name,
                Rating = 0,
                Thumbnail = "",
                Lat = model.Lat,
                Lon = model.Lon
            };


            try
            {
                _context.CarCompanies.Add(carCompany);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Console.WriteLine($"Error with creating new car company. -> {dex.Message}");
            }

            return Ok(carCompany);
        }


        [HttpGet("DeleteUser/{userEmail}")]
        public async Task<object> DeleteUser(string userEmail)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            
            if (user == null)
                return NotFound();

            try
            {
                var role = await _userManager.GetRolesAsync(user);
                _context.Users.Remove(user);
                

                if(role.FirstOrDefault() == "CarAdmin")
                {
                    //izbrisi njegove kompanije i auta
                    var company = await _carCompanyRepository.GetCompanyByEmail(userEmail);

                    if(company.Cars.Count > 0)
                    {
                        foreach (Car car in company.Cars)
                            company.Cars.Remove(car);
                    }

                    _context.CarCompanies.Remove(company);
                }

                if(role.FirstOrDefault() == "AvioAdmin")
                {
                    //izbrisi njegove kompanije

                }

                _context.SaveChanges();
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while deleting a user. [{e.Message}]");
                return BadRequest();
            }
            
        }

    }
}

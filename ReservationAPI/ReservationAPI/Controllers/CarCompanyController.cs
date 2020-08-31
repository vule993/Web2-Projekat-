using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels;
using ReservationAPI.ViewModels.RentACar;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarCompanyController : ControllerBase
    {
        private readonly ICarCompany _repository;
        private ApplicationDbContext _context;

        public CarCompanyController(ICarCompany repository, ApplicationDbContext context)
        {
            _repository = repository;
            _context = context;
        }


        //GET: /api/CarCompany/GetAll
        [HttpGet]
        [Route("GetAll")]
        public async Task<IEnumerable<CarCompany>> GetAll()
        {
            var companies = await _repository.GetCompanies();

            return companies;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(int id)
        {
            if (id < 0)
                return BadRequest();

            try
            {
                var company = await _repository.GetCompany(id);

                if (company == null)
                    return NotFound();

                return Ok(company);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR with getting company. -> {ex.Message}");
                return BadRequest();
            }
        }


        //GET: /api/CarCompany/GetCompanyByEmail/caradmin@gmail.com
        [HttpGet("GetCompanyByEmail/{email}")]
        public async Task<IActionResult> GetCompanyByEmail(string email) //id-> email admina cija je kompanija
        {
            if (email == null)
                return BadRequest();

            try
            {
                var company = await _repository.GetCompanyByEmail(email);

                if (company == null)
                    return NotFound();

                return Ok(company);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR with getting company. -> {ex.Message}");
                return BadRequest();
            }
        }


        //GET:  /api/CarCompany/CarId/3
        [HttpGet("CarId/{carId}")]
        public async Task<IActionResult> GetCompanyByEmail(long carId)
        {
            try
            {
                return Ok(await _repository.GetCompanyByCarId(carId));
            }
            catch(Exception ex)
            {
                Console.WriteLine($"ERROR with getting company. -> {ex.Message}");
                return BadRequest();
            }
        }

        //POST: /api/CarCompany/Add
        [HttpPost]
        [Route("Add")]
        public async Task<object> AddCompany([FromBody]CarCompany model)
        {
            if (!await _repository.AddCompany(model))
                return BadRequest(new { message = $"Car company: {model.Name} already exists..." });

            return Ok(new { message = "Car company created.", company = model});
        }


        [HttpPost]
        [Route("AddCarToCompany")]
        public async Task<object> AddCarToCompany([FromBody] AddCarToCompanyModel model)
        {
            try
            {
                await _repository.AddCarToCompany(model.Car.Id, model.CompanyId);
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine($"ERROR with adding car to company. -> {e.Message}");
                return new { Message = e.Message };
            }
        }

        //DELETE: /api/CarCompany/Delete/3
        [HttpDelete("Delete/{id}")]
        //[Authorize(Roles = "CarAdmin")]
        public async Task<object> Delete(long id)
        {
            CarCompany company = await _repository.GetCompany(id);
            try
            {
                await _repository.DeleteCompany(id);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"ERROR with deleting company. -> {ex.Message}");
            }
            

            return Ok(new { message = "Car company deleted", company = company});
        }
        

        //PUT: /api/CarCompany/Update/3
        [HttpPut("{id}")]
        [Route("Update")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Update(string id, [FromBody]CarCompany model)
        {
            CarCompany company = await _repository.GetCompanyByEmail(id);

            try
            {
                await _repository.UpdateCarCompany(model);
            }
            catch(Exception ex)
            {
                Console.WriteLine($"ERROR with updating a car company. -> {ex.Message}");
            }

            return Ok(new { message = "Car company updated.", company = company });

        }


        [HttpPost]
        [Route("EditCompany")]
        public void EditCompany([FromBody] CarCompany carCompany)
        {
            try
            {
                _context.CarCompanies.Update(carCompany);
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while updating car company: [{e.Message}]");
            }
        }

        
        [HttpPost]
        [Route("RateCompany")]
        public async Task<object> RateThisCompany([FromBody] RatingModel model)
        {
            try
            {
                double result = await _repository.rateCompany(model);
                return Ok(result);
            }
            catch(Exception e)
            {
                Console.WriteLine($"ERROR with rating car company. -> {e.Message}");
                return BadRequest(new { Message = $"ERROR with rating car company. -> {e.Message}" });
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public CarCompanyController(ICarCompany repository)
        {
            _repository = repository;
        }


        //GET: /api/CarCompany/GetAll
        [HttpGet]
        [Route("GetAll")]
        public async Task<IEnumerable<CarCompany>> GetAll()
        {
            var companies = await _repository.GetCompanies();

            return companies;
        }


        //GET: /api/CarCompany/caradmin@gmail.com
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(string id) //id-> email admina cija je kompanija
        {
            if (id == null)
                return BadRequest();

            try
            {
                var company = await _repository.GetCompanyByEmail(id);

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
                await _repository.AddCarToCompany(model.CarId, model.CarCompanyId);
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine($"ERROR with adding car to company. -> {e.Message}");
                return new { Message = e.Message };
            }
        }

        //DELETE: /api/CarCompany/Delete/3
        [HttpDelete("{id}")]
        [Route("Delete")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Delete(int id)
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
    }
}

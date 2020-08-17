using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels.RentACar;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _repository;

        public CarController(ICarRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Car/id
        //[HttpGet("{id}")]
        //public async Task<Car> GetCar(long id)
        //{
        //    return await _repository.GetCar(id);
        //}


        [HttpGet("GetCarsOfCompany/{id}")]
        public async Task<IEnumerable<Car>> GetCarsOfCompany(long companyId)
        {
            try
            {
                return await _repository.GetCarsOfCompany(companyId);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while geting cars... [{e.Message}]");
                return null;
            }
        }


        //POST: api/car
        [HttpPost]
        public async Task<object> PostCar(AddCarToCompanyModel model)
        {
            try
            {
                await _repository.AddCar(model.Car, model.CompanyId);
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Failed to add a car." });
            }
                

            return Ok(model);
        }


        // PUT api/Car/Update/5
        [HttpPut("{id}")]
        [Route("Update")]
        public async Task Put(int id, [FromBody] Car model)
        {
            await _repository.UpdateCar(model);
        }


        //DELETE api/Car/Delete/5
        [HttpDelete("{id}")]
        [Route("Delete")]
        public async Task Delete(int id)
        {
            await _repository.DeleteCar(id);
        }


    }
}

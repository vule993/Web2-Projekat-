using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _repository;

        public CarController(ICarRepository repository)
        {
            _repository = repository;
        }

        //GET: api/Car/id
        [HttpGet("{id}")]
        public async Task<Car> GetCar(long id)
        {
            return await _repository.GetCar(id);
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IEnumerable<Car>> GetCars()
        {
            try
            {
                return await _repository.GetCars();
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while geting cars... [{e.Message}]");
                return null;
            }
        }

        [HttpGet("GetCarsOfCompany/{companyId}")]
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
        public async Task Put([FromBody] Car model)
        {
            try
            {
                await _repository.UpdateCar(model);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while updating a car. [{e.Message}]");
            }
        }


        //DELETE api/Car/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task Delete(int id)
        {
            try
            {
                await _repository.DeleteCar(id);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while deleting a car. [{e.Message}]");
            }
        }


        [HttpPost]
        [Route("MakeReservation")]
        public async Task<object> MakeReservation(CarReservationModel carReservationModel)
        {
            try
            {
                var res = await _repository.MakeReservation(carReservationModel);
                return Ok(res);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Error while making car reservation. [{e.Message}]");
                return BadRequest(new { message = "Failed to make car reservation." });
            }

        }


        [HttpPost]
        [Route("RateCar")]
        public async Task<object> RateThisCar([FromBody] RatingModel model)
        {
            try
            {
                double result = await _repository.rateCar(model);
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine($"ERROR with rating car. -> {e.Message}");
                return BadRequest(new { Message = $"ERROR with rating car. -> {e.Message}" });
            }
        }
    }
}

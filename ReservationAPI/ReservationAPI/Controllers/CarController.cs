using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;

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
        [HttpGet("{id}")]
        public async Task<Car> GetCar(long id)
        {
            return await _repository.GetCar(id);
        }


        //POST: api/car
        [HttpPost]
        public async Task<object> PostCar([FromBody] Car model)
        {
            if (!await _repository.AddCar(model))
                return BadRequest(new { message = "Failed to add a car." });

            return Ok(model);
        }


        // PUT api/Car/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] Car model)
        {
            await _repository.UpdateCar(model);
        }


        //DELETE api/Car/5
        public async Task Delete(int id)
        {
            await _repository.DeleteCar(id);
        }


    }
}

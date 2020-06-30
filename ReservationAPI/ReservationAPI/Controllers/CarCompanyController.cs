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


        //GET: /api/CarCompany/3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(int? id) //mozda cu dodavati nesto u car model
        {
            if (id == null)
                return BadRequest();

            try
            {
                var company = await _repository.GetCompany(id);

                if (company == null)
                    return NotFound();

                return Ok(company);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        //POST: /api/CarCompany/Add
        [HttpPost]
        [Route("Add")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> AddCompany([FromBody]CarCompany model)
        {
            if (!await _repository.AddCompany(model))
                return BadRequest(new { message = $"Car company: {model.Name} already exists..." });

            return Ok(new { message = "Car company created.", company = model});
        }


        //DELETE: /api/CarCompany/Delete/3
        [HttpDelete("{id}")]
        [Route("Delete")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Delete(int id)
        {
            CarCompany company = await _repository.GetCompany(id);
            await _repository.DeleteCompany(id);

            return Ok(new { message = "Car company deleted", company = company});
        }
        

        //PUT: /api/CarCompany/Update/3
        [HttpPut("{id}")]
        [Route("Update")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Update(int id, [FromBody]CarCompany model)
        {
            CarCompany company = await _repository.GetCompany(id);
            await _repository.UpdateCarCompany(model);

            return Ok(new { message = "Car company updated.", company = company });

        }
    }
}

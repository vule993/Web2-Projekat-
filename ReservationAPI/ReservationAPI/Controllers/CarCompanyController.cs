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
        public async Task<IEnumerable<CarCompanyController>> GetAll()
        {
            var companies = await _repository.GetCompanies();

            return (IEnumerable<CarCompanyController>)companies;
        }


        //GET: /api/CarCompany/3
        //[HttpGet("{id}")]
        //public async Task<CarCompanyModel> GetCompany(int id) //mozda cu dodavati nesto u car model
        //{
        //    var company = await _repository.GetCompany(id);

        //    var companyModel = new CarCompanyModel(company);

        //    return companyModel;
        //}

        //POST: /api/CarCompany/Add
        [HttpPost]
        [Route("Add")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> AddCompany([FromBody]CarCompany model)
        {
            //var company = new CarCompanyModel(model);

            if (!await _repository.AddCompany(model))
                return BadRequest(new { message = $"Car company: {model.Name} already exists..." });

            return Ok(new { message = "Car company created.", company = model});
        }


        //DELETE: /api/CarCompany/3
        [HttpDelete("{id}")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Delete(int id)
        {
            CarCompany company = await _repository.GetCompany(id);
            await _repository.DeleteCompany(id);

            return Ok(new { message = "Car company deleted", company = company});
        }
        

        //PUT: /api/CarCompany/3
        [HttpPut("{id}")]
        [Authorize(Roles = "CarAdmin")]
        public async Task<object> Update(int id, [FromBody]CarCompany model)
        {
            CarCompany company = await _repository.GetCompany(id);
            await _repository.UpdateCarCompany(model);

            return Ok(new { message = "Car company updated.", company = company });

        }
    }
}

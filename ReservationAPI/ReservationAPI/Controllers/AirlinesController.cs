using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.ViewModels;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {
        IAirlines _service;
        public AirlinesController(IAirlines service)
        {
            _service = service;
        }



        #region COMPANY PROFILE

        [HttpGet]
        [Route("GetCompany/{email}")]
        public async Task<object> GetCompany(string email)
        {
            try
            {
                AirlineCompany company = await _service.GetCompany(email);
                return company;
            }
            catch (Exception e)
            {
                Trace.WriteLine(e);
            }

            return NotFound( new { Message = "Profile not found" });
        }


        [HttpGet]
        [Route("GetAllCompanies")]
        public async Task<object> GetAllCompanies()
        {
            return await _service.GetAllCompanies();
        }


        [HttpPut]
        [Route("UpdateCompanyInfo")]
        public async Task<bool> UpdateCompanyInfo(AirlineCompany company)
        {
            if(await _service.UpdateCompanyInfo(company))
            {
                return true;
            }
            return false;
        }
        #endregion


        #region DESTINATIONS
        
        [HttpPost]
        [Route("AddDestinations")]
        public async Task<object> AddDestination([FromBody]AddDestinationViewModel data)
        {
            if(await _service.CreateDestination(data.Company, data.Destination))
            {
                return Ok(new {Message = "Successfully created destination!"});
            }
            return Ok(new { Message = "Destination airport already exists!" });
        }

        [HttpGet]
        [Route("Destinations")]
        public async Task<List<Destination>> GetAllDestinations()
        {
            var destinations = (List<Destination>)await _service.GetDestinations();
            return destinations;
        }

        [HttpGet]
        [Route("Destinations/{id}")]
        public async Task<Destination> GetOneDestination(string id)
        {
            Destination destination = await _service.GetDestination(id);
            return destination;
        }

        [HttpDelete]
        [Route("DeleteDestination/{id}")]
        public async Task<bool> DeleteDestination(long id)
        {
            return await _service.DeleteDestination(id);
        }
        #endregion

        #region FLIGHTS
        [HttpPut]
        [Route("CreateFlight")]
        public async Task<object> CreateFlight(Flight flight)
        {
            if(await _service.CreateFlight(flight))
                return Ok("Flight successfully created!");

            return Unauthorized();
        }
        #endregion
    }
}

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
        [Route("GetCompanyById/{id}")]
        public async Task<object> GetCompanyById(string id)
        {
            try
            {
                AirlineCompany company = await _service.GetCompanyById(id);
                return company;
            }
            catch (Exception e)
            {
                Trace.WriteLine(e);
            }

            return NotFound(new { Message = "Profile not found" });
        }


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


        //DELETE: /api/Airlines/Delete/3
        [HttpDelete("Delete/{id}")]
        //[Authorize(Roles = "AvioAdmin")]
        public async Task<object> Delete(long id)
        {
            AirlineCompany company = await _service.GetCompany(id.ToString());
            try
            {
                await _service.DeleteCompany(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR with deleting company. -> {ex.Message}");
            }


            return Ok(new { message = "Avio company deleted", company = company });
        }


        [HttpPost]
        [Route("RateCompany")]
        public async Task<object> RateCompany(FlightCompanyRating rating)
        {
            return await _service.RateCompany(rating);
        }
        [HttpGet]
        [Route("GetAllCompanyRatings/{id}")]
        public async Task<List<FlightCompanyRating>> GetAllCompanyRatings(long id)
        {
            return await _service.GetAllCompanyRatings(id);
        }

        #endregion



        #region DESTINATIONS

        //[HttpPost]
        //[Route("AddDestinations")]
        //public async Task<object> AddDestination([FromBody]AddDestinationViewModel data)
        //{
        //    if(await _service.CreateDestination(data.Company, data.Destination))
        //    {
        //        return Ok(new {Message = "Successfully created destination!"});
        //    }
        //    return Ok(new { Message = "Destination airport already exists!" });
        //}

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

        //[HttpDelete]
        //[Route("DeleteDestination/{id}")]
        //public async Task<bool> DeleteDestination(long id)
        //{
        //    return await _service.DeleteDestination(id);
        //}


        //Available Destinations

        [HttpPost]
        [Route("AddAvailableDestination")]
        public async Task<object> AddAvailableDestination([FromBody] AddDestinationViewModel data)
        {
            if (await _service.CreateAvailableDestination(data.Company, data.Destination))
            {
                return Ok(new { Message = "Successfully created destination!" });
            }
            return Ok(new { Message = "Destination airport already exists!" });
        }

        [HttpGet]
        [Route("AvailableDestinations")]
        public async Task<List<AvailableDestination>> GetAllAvailableDestinations()
        {
            var destinations = (List<AvailableDestination>)await _service.GetAvailableDestinations();
            return destinations;
        }

        [HttpGet]
        [Route("AvailableDestinations/{id}")]
        public async Task<AvailableDestination> GetOneAvailableDestination(string id)
        {
            AvailableDestination destination = await _service.GetAvailableDestination(id);
            return destination;
        }

        [HttpDelete]
        [Route("DeleteAvailableDestination/{id}")]
        public async Task<bool> DeleteAvailableDestination(long id)
        {
            return await _service.DeleteAvailableDestination(id);
        }


        #endregion



        #region FLIGHTS

        [HttpGet]
        [Route("GetAllFlights")]
        public async Task<object> GetAllFlights() => await _service.GetAllFlights();

        [HttpPut]
        [Route("CreateFlight")]
        public async Task<object> CreateFlight(Flight flight)
        {
            if(await _service.CreateFlight(flight))
                return Ok("Flight successfully created!");

            return Unauthorized();
        }

        [HttpGet]
        [Route("GetFlight/{id}")]
        public async Task<object> GetFlight(long id) => await _service.GetFlight(id);

        #endregion



        #region SEAT CONFIGURATIONS

        [HttpGet]
        [Route("GetAllSeatConfigurations")]
        public async Task<IEnumerable<SeatConfiguration>> GetAllSeatConfigurations()
        {
            return await _service.GetAllSeatConfigurations();
        }

        [HttpGet]
        [Route("GetSeatConfiguration")]
        public async Task<object> GetSeatConfiguration(string id)
        {
            return await _service.GetSeatConfiguration(id);
        }

        [HttpPut]
        [Route("CreateSeatConfiguration")]
        public async Task<bool> CreateSeatConfiguration(SeatConfiguration seatConfiguration)
        {
            return await _service.CreateSeatConfiguration(seatConfiguration);
        }

        


        #endregion



        #region PLANE TYPES

        [HttpGet]
        [Route("GetAllPlaneTypes")]
        public async Task<IEnumerable<PlaneType>> GetAllPlaneTypes()
        {
            return await _service.GetAllPlaneTypes();
        }

        [HttpGet]
        [Route("GetPlaneType/{id}")]
        public async Task<PlaneType> GetPlaneType(string id)
        {
            return await _service.GetPlaneType(id);
        }

        [HttpPut]
        [Route("CreatePlaneType")]
        public async Task<bool> CreatePlaneType(PlaneType planeType)
        {
            return await _service.CreatePlaneType(planeType);
        }
        #endregion



        #region OTHER SERVICES

        [HttpGet]
        [Route("GetAllServices")]
        public async Task<IEnumerable<PlaneService>> GetAllServices()
        {
            return await _service.GetAllServices();
        }

        [HttpPut]
        [Route("CreateService")]
        public async Task<bool> CreateService(PlaneService planeService)
        {
            return await _service.CreateService(planeService);
        }

        [HttpDelete]
        [Route("DeleteService/{id}")]
        public async Task<bool> DeleteService(long id)
        {
            return await _service.DeleteService(id);
        }

        //Available services

        [HttpGet]
        [Route("GetAllAvailableServices")]
        public async Task<IEnumerable<AvailableService>> GetAllAvailableServices()
        {
            return await _service.GetAllAvailableServices();
        }

        [HttpPut]
        [Route("CreateAvailableService")]
        public async Task<bool> CreateAvailableService(AvailableService availableService)
        {
            return await _service.CreateAvailableService(availableService);
        }

        [HttpDelete]
        [Route("DeleteAvailableService/{id}")]
        public async Task<bool> DeleteAvailableService(long id)
        {
            return await _service.DeleteAvailableService(id);
        }
        #endregion
    }
}

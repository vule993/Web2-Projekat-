using System;
using System.Collections.Generic;
using System.Linq;
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

        //metode

        //Add api/Airlines/AddDestinations
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
        public async Task<List<Destination>> GetAllDestinations()
        {
            var destinations = (List<Destination>)await _service.GetDestinations();
            return destinations;
        }

        [HttpGet]
        [Route("{id}")]
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
    }
}

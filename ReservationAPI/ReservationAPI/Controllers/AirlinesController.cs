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
    }
}

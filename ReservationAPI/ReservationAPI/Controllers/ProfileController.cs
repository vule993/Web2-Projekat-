using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
using ReservationAPI.Models.Interfaces;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        IProfileOperations _service;
        public ProfileController(IProfileOperations service)
        {
            _service = service;
        }

        public async Task<object> EditProfile([FromBody]UserModel user)
        {

            return new object();
        }
    }
}

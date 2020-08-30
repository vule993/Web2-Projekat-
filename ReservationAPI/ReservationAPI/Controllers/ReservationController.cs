using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.Interfaces;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        IAirlines _airlineService;
        IReservation _reservationService;
        IAirlineReservation _airlineReservationService;

        public ReservationController(IAirlines airlineService, IReservation reservationService, IAirlineReservation airlineReservationService)
        {
            _airlineService = airlineService;
            _reservationService = reservationService;
            _airlineReservationService = airlineReservationService;
        }


        [HttpGet]
        [Route("GetAllReservations")]
        public async Task<List<Reservation>> GetAllReservations()
        {
            return await _reservationService.GetAllReservations();
        }
        [HttpPut]
        [Route("CreateReservation")]
        public async Task<object> CreateReservation(Reservation r)
        {
            return await _reservationService.CreateReservation(r);
        }
        [HttpDelete]
        [Route("DeleteReservation")]
        public async Task<object> DeleteReservation(long reservationId)
        {
            return await _reservationService.DeleteReservation(reservationId);
        }
        [HttpGet]
        [Route("FinishReservation/{id}")]
        public async Task<object> FinishReservation(long id)
        {
            return await _reservationService.FinishReservation(id);
        }

        [HttpPost]
        [Route("RateReservation")]
        public async Task<object> RateReservation(FlightRating reservation)
        {
            return await _reservationService.RateReservation(reservation);
        }

        [HttpPut]
        [Route("CancelReservation")]
        public async Task<object> CancelReservation(Reservation reservation)
        {
            return await _reservationService.CancelReservation(reservation);
        }

    }
}

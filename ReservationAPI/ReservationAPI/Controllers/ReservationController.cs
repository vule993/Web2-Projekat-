using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
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
        private UserManager<User> _userManager;

        public ReservationController(IAirlines airlineService, IReservation reservationService, IAirlineReservation airlineReservationService, UserManager<User> userManager)
        {
            _airlineService = airlineService;
            _reservationService = reservationService;
            _airlineReservationService = airlineReservationService;
            _userManager = userManager;
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
            string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var initiator = await _userManager.FindByEmailAsync(userID);  //mail ko salje zahtev da mu ne ide notification

            return await _reservationService.CreateReservation(r, initiator.Email);
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
        public async Task<object> CancelReservation(Reservation reservation)        //ovo je kada odustajes od rez
        {
            return await _reservationService.CancelReservation(reservation);
        }

        [HttpGet]
        [Route("AcceptReservation/{reservationId}")]
        public async Task<object> AcceptInvite(long reservationId)        //ovo je kada prihvatis poziv
        {
            return await _reservationService.AcceptReservation(reservationId);
        }

        [HttpGet]
        [Route("DeclineReservation/{reservationId}")]
        public async Task<object> DeclineReservation(long reservationId)       //ovo je kada odbijes pozivnicu
        {
            return await _reservationService.DeclineReservation(reservationId);
        }

    }
}

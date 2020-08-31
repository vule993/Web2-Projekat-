using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using ReservationAPI.Models;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Shared;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotification _notificationService;
        private IReservation _reservationService;
        private UserManager<User> _userManager;

        public NotificationController( UserManager<User> userManager, INotification notificationService, IReservation reservationService)
        {

            _userManager = userManager;
            _reservationService = reservationService;
            _notificationService = notificationService;
        }

        [HttpGet]
        [Route("GetAllNotifications/{email}")]
        public async Task<List<ReservationNotification>> GetAllReservationNotifications(string email)
        {

            return await _notificationService.GetAllReservationNotifications(email);
        }

        [HttpPost]
        [Route("CreateReservationNotification")]
        public async Task<object> CreateReservationNotification(ReservationNotification reservation)
        {
            string userID = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var initiator = await _userManager.FindByEmailAsync(userID);
            return await _notificationService.CreateReservationNotification(reservation, initiator.Email);
        }

        [HttpGet]
        [Route("MarkReservationNotificationAsViewd/{notificationId}")]
        public async Task<object> MarkReservationNotificationAsViewd(long notificationId)
        {
            return await _notificationService.MarkReservationNotificationAsViewd(notificationId);
        }
        [HttpGet]
        [Route("ResolveNotification/{notificationId}")]
        public async Task<object> ResolveNotification(long notificationId)
        {
            return await _notificationService.ResolveNotification(notificationId);
        }
        //[HttpGet]
        //[Route("MarkReservationNotificationAsChecked/{notificationId}")]
        //public async Task<object> MarkReservationNotificationAsChecked(long notificationId)
        //{
        //    return await _notificationService.MarkReservationNotificationAsViewd(notificationId);
        //}

        //[HttpGet]
        //[Route("MarkReservationNotificationAsViewd/{notificationId}")]
        //public async Task<object> MarkReservationNotificationAsCanceled(long notificationId)
        //{
        //    return await _notificationService.MarkReservationNotificationAsViewd(notificationId);
        //}
    }
}

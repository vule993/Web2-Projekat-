using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using ReservationAPI.Hubs;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Shared;
using ReservationAPI.TimerFeatures;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotification _notificationService;
        private IReservation _reservationService;
        private UserManager<User> _userManager;
        private IHubContext<NotificationsHub> _notificationsHub;
        private static ApplicationDbContext _context;
        private static int i = 0;
        public NotificationController(ApplicationDbContext context, IHubContext<NotificationsHub> notificationsHub, UserManager<User> userManager, INotification notificationService, IReservation reservationService)
        {
            _context = context;
            _userManager = userManager;
            _reservationService = reservationService;
            _notificationService = notificationService;
            _notificationsHub = notificationsHub;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            SqlDependency dependency = new SqlDependency();
            dependency.OnChange += new OnChangeEventHandler(dbNotificationOnChange);


            var user = await _userManager.FindByEmailAsync("avioadmin@outlook.com");
            var data = await _notificationService.GetAllReservationNotifications("avioadmin@outlook.com");

            //var connectionId = HubUserHandler.ConnectedIds["avioadmin@outlook.com"];
            var proxy = _notificationsHub.Clients.Client(user.Id);
            var prox1 = _notificationsHub.Clients.All;
            object[] niz = new object[1];
            niz[0] = data;
            
            //_notificationsHub
            var timerManager = new TimerManager(
                () => proxy.SendCoreAsync("transfernotificationsdata",niz)
            );
        
            return new { Message = "Success!"};
        }

        private void dbNotificationOnChange(object sender, SqlNotificationEventArgs e)
        {
            Console.WriteLine("Hello World!");
        }

        [HttpGet]
        [Route("GetAllNotifications/{email}")]
        public async Task<List<ReservationNotification>> GetAllReservationNotifications(string email)
        {
            //var timerManager = new TimerManager(() => _notificationsHub.Clients.All.SendAsync("transfernotificationsdata", ++i));
            //return Ok(new { Message = "Request completed!" });
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

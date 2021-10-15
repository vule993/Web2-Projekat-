using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class NotificationService : INotification
    {

        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<object> CreateReservationNotification(ReservationNotification notification, string initiatorEmail)
        {
            ReservationNotification Notification;
            try
            {
                Notification = new ReservationNotification()
                {
                    UserEmailFrom = notification.UserEmailFrom,
                    UserEmailTo = notification.UserEmailTo,
                    ReservationId = notification.ReservationId,
                    Message = notification.Message,
                    Status = 0,
                };

                if(initiatorEmail == Notification.UserEmailTo)
                {
                    return HttpStatusCode.OK;
                }

            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }

            await _context.ReservationNotification.AddAsync(Notification);
            await _context.SaveChangesAsync();

            return Notification;
        }

        public async Task<List<ReservationNotification>> GetAllReservationNotifications(string email)
        {
            List<ReservationNotification> notifications = null;
            try {

                notifications = (await _context.ReservationNotification.ToListAsync()).FindAll(rn => email == rn.UserEmailTo);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return notifications;

        }

        public async Task<object> MarkReservationNotificationAsViewd(long notificationId)
        {
            var notification = (await _context.ReservationNotification.ToListAsync()).FirstOrDefault(n => n.Id == notificationId);
            notification.Status = 1;

            await _context.SaveChangesAsync();

            return notification;

        }

        public async Task<object> ResolveNotification(long notificationId)
        {
            var notification = (await _context.ReservationNotification.ToListAsync()).FirstOrDefault(n => n.Id == notificationId);
            notification.Status = 2;

            await _context.SaveChangesAsync();

            return notification;

        }
    }
}

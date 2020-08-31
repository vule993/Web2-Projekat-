using ReservationAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface INotification
    {
        //ReservationNotification
        Task<List<ReservationNotification>> GetAllReservationNotifications(string email);
        Task<object> CreateReservationNotification(ReservationNotification notification, string initiatorEmail);
        Task<object> MarkReservationNotificationAsViewd(long notificationId);
        Task<object> ResolveNotification(long notificationId);

        //Task<object> MarkReservationNotificationAsChecked(long notificationId);
        //Task<object> MarkReservationNotificationAsCanceled(long notificationId);
    }
}

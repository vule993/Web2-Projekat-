using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using ReservationAPI.Models;
using ReservationAPI.Models.Shared;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace ReservationAPI.Hubs
{
    public static class HubUserHandler
    {
        public static ConcurrentDictionary<string, string> ConnectedIds = new ConcurrentDictionary<string, string>();
    }

    public class NotificationsHub : Hub
    {
        [HubMethodName("SendToCurrentUser")]
        public Task SendToCurrentUser(List<ReservationNotification> data)
        {
            var connectionId = Context.ConnectionId;
            return Clients.Client(connectionId).SendAsync("transfernotificationsdata", data);
        }
    }
}

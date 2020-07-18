using ReservationAPI.Models;
using ReservationAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class ProfileService : IProfileOperations
    {
        public Task<bool> EditProfile(string mail)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetActiveReservations()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetArchivedReservations()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetFriends()
        {
            throw new NotImplementedException();
        }
    }
}

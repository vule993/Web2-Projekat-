using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface IProfileOperations
    {
        Task<bool> EditProfile(string mail);
        Task<IEnumerable<User>> GetFriends();
        Task<IEnumerable<User>> GetArchivedReservations();
        Task<IEnumerable<User>> GetActiveReservations();
    }
}

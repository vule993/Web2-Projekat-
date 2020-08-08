using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface IAirlines
    {
        //Task UpdateProfile();
        Task<object> CreateDestination(AirlineCompany id, Destination destination);
    }
}

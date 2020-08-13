using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface IAirlines
    {
        #region CompanyProfile
        Task<bool> UpdateCompanyInfo(AirlineCompany company);
        Task<AirlineCompany> GetCompany(string id);
        Task<IEnumerable<AirlineCompany>> GetAllCompanies();
        #endregion


        #region Destinations
        Task<bool> CreateDestination(AirlineCompany id, Destination destination);
        Task<IEnumerable<Destination>> GetDestinations();
        Task<Destination> GetDestination(string id);
        Task<bool> DeleteDestination(long id);
        #endregion

        #region Flights
        Task<bool> CreateFlight(Flight flight);
        Task<bool> DeleteFlight(long id);
        #endregion
    }
}

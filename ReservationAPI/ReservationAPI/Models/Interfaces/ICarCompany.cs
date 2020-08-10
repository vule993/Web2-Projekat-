using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface ICarCompany
    {
        Task<CarCompany> GetCompany(string id);

        Task<IEnumerable<CarCompany>> GetCompanies();

        Task DeleteCompany(string id);

        Task<bool> AddCompany(CarCompany carCompany);

        Task UpdateCarCompany(CarCompany carCompany);

        Task AddCarToCompany(long carId, long carCompanyId);
    }
}

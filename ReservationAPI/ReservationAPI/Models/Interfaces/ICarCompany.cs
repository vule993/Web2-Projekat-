using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface ICarCompany
    {
        Task<CarCompany> GetCompany(long id);

        Task<CarCompany> GetCompanyByEmail(string adminEmail);

        Task<CarCompany> GetCompanyByCarId(long carId);

        Task<IEnumerable<CarCompany>> GetCompanies();

        Task DeleteCompany(long id);

        Task<bool> AddCompany(CarCompany carCompany);

        Task UpdateCarCompany(CarCompany carCompany);

        Task AddCarToCompany(long carId, long carCompanyId);

        Task<double> rateCompany(RatingModel model);
    }
}

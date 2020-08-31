using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.Models.Shared;
using ReservationAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class CarCompanyService : ICarCompany
    {
        private readonly ApplicationDbContext _context;

        public CarCompanyService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<CarCompany> GetCompany(long id)
        {
            //return await _context.CarCompanies.Include(c => c.Cars)
            //    .Include(c => c.City)
            //    .Include(c => c.Rating)
            //    .FirstOrDefaultAsync(c => c.Id == id);

            return await _context.CarCompanies.FirstOrDefaultAsync(company => company.Id == id);
        }

        public async Task<CarCompany> GetCompanyByCarId(long carId)
        {
            var c =  await _context.CarCompanies.FirstOrDefaultAsync(
                company => company.Cars.Where(car => car.Id == carId).Any());

            return c;
        }

        public async Task<bool> AddCompany(CarCompany carCompany)
        {
            try
            {
                var company = await _context.FindAsync<CarCompany>(carCompany.Id);
                
                if (company != null)
                    return false;

                //var admin = _context.FindAsync<UserModel>(carCompany.Admin).Result;

                await _context.AddAsync(company);
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                return false;
            }
            
        }

        public async Task DeleteCompany(long id)
        {
            var company = await _context.CarCompanies.FindAsync(id);

            _context.CarCompanies.Remove(company);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CarCompany>> GetCompanies()
        {
            return await _context.CarCompanies.ToListAsync();
        }

        public async Task<CarCompany> GetCompanyByEmail(string adminEmail)
        {
            return  await _context.CarCompanies.FirstOrDefaultAsync(x => x.Admin == adminEmail);
        }

        public async Task UpdateCarCompany(CarCompany carCompany)
        {
            _context.Update(carCompany);
            await _context.SaveChangesAsync();
        }

        public async Task AddCarToCompany(long carId, long carCompanyId)
        {
            var car = await _context.FindAsync<Car>(carId);
            var carCompany = await _context.FindAsync<CarCompany>(carCompanyId);

            carCompany.Cars.Add(car);
            await _context.SaveChangesAsync();
        }

        public async Task<double> rateCompany(RatingModel model)
        {
            var company = await _context.FindAsync<CarCompany>(model.CarCompanyId);

            var rating = new Rating()
            {
                Rate = model.Rate,
                CarCompanyId = model.CarCompanyId,
                UserEmail = model.UserEmail
            };

            foreach(var r in company.Rates)
            {
                if(r.UserEmail == rating.UserEmail)
                {
                    return -1;
                }
            }

            company.Rates.Add(rating);
            _context.Ratings.Add(rating);
            var avg = company.Rates.Where(c => c.CarCompanyId == rating.CarCompanyId).Average(c => c.Rate);

            company.Rating = avg;
            _context.SaveChanges();

            return avg;
        }
    }
}

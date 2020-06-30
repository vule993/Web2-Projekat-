using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
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

        
        public async Task<bool> AddCompany(CarCompany carCompany)
        {
            try
            {
                var company = await _context.FindAsync<CarCompany>(carCompany.Id);
                
                if (company != null)
                    return false;

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

        public async Task<CarCompany> GetCompany(int? id)
        {
            return await _context.CarCompanies.Include(c => c.Cars)
                .Include(c => c.City)
                .Include(c => c.Rating)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task UpdateCarCompany(CarCompany carCompany)
        {
            _context.Update(carCompany);
            await _context.SaveChangesAsync();
        }
    }
}

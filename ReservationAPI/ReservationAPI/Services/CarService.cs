using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class CarService : ICarRepository
    {
        private readonly ApplicationDbContext _context;


        public CarService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddCar(Car car)
        {
            var c = await _context.Car.FindAsync(car.Id);

            if (c != null) 
                return false;

            await _context.Car.AddAsync(car);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task DeleteCar(long id)
        {
            var c = await _context.Car.FindAsync(id);

            _context.Car.Remove(c);

            await _context.SaveChangesAsync();
        }

        public async Task<Car> GetCar(long id)
        {
            return await _context.Car.FindAsync(id);
        }

        public async Task UpdateCar(Car car)
        {
           // _context.Update(car);
            _context.Car.Update(car);
            await _context.SaveChangesAsync();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels.RentACar;
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

        public async Task AddCar(Car car, long companyId)
        {
            var company = await _context.FindAsync<CarCompany>(companyId);

            company.Cars.Add(car);
            await _context.SaveChangesAsync();
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

        //getCar of some car-company
        public async Task<IEnumerable<Car>> GetCarsOfCompany(long companyID)
        {
            var cars = (await _context.CarCompanies.Include(c => c.Cars)
                .FirstOrDefaultAsync(company => company.Id == companyID)).Cars.ToList();

            return cars;
        }

        public async Task MakeReservation(CarReservationModel reservation)
        {
            Car car = await GetCar(reservation.CarId);
            car.IsReserved = true;

            var carReservation = new CarReservation()
            {
                Car = car,
                EndDate = reservation.EndDate,
                FullPrice = reservation.FullPrice,
                StartDate = reservation.StartDate,     
                UserEmail = reservation.UserEmail
            };

            //update this car in db
            _context.Car.Update(car);

            //write in reservations
            _context.CarReservations.Add(carReservation);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateCar(Car car)
        {
            _context.Car.Update(car);
            await _context.SaveChangesAsync();
        }

        
    }
}

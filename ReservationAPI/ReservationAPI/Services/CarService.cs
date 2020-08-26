using Microsoft.AspNetCore.Identity.UI.Services;
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
        private IMailService _emailSender;


        public CarService(ApplicationDbContext context, IMailService emailSender)
        {
            _context = context;
            _emailSender = emailSender;
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

        public async Task<IEnumerable<Car>> GetCars()
        {
            return await _context.Car.ToListAsync();
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

            //posalji izvestaj na email
            await _emailSender.SendEmailAsync(carReservation.UserEmail,
                "Succesfull car reservation!",
                $"<h2>Congratulations!</h2><p>You made a successful car reservation. Your {carReservation.Car.Mark} is ready to go!</p>");
        }

        public async Task UpdateCar(Car car)
        {
            _context.Car.Update(car);
            await _context.SaveChangesAsync();
        }

        
    }
}

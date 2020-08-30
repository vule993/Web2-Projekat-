﻿using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels;
using ReservationAPI.ViewModels.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface ICarRepository
    {
        Task<Car> GetCar(long id);

        Task AddCar(Car car, long companyId);

        Task DeleteCar(long id);

        Task UpdateCar(Car car);

        Task<IEnumerable<Car>> GetCarsOfCompany(long companyID);

        Task<IEnumerable<Car>> GetCars();

        Task<CarReservation> MakeReservation(CarReservationModel reservation);

        Task<double> rateCar(RatingModel model);
    }
}

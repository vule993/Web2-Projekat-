﻿using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface ICarRepository
    {
        Task<Car> GetCar(long id);

        Task<bool> AddCar(Car car);

        Task DeleteCar(long id);

        Task UpdateCar(Car car);
    }
}

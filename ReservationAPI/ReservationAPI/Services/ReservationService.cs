﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.ViewModels.RentACar;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class ReservationService : IReservation
    {
        private readonly ApplicationDbContext _context;
        private UserManager<User> _userManager;
        private ICarRepository _carService;

        public ReservationService(ApplicationDbContext context, UserManager<User> userManager, ICarRepository carService)
        {
            _context = context;
            _userManager = userManager;
            _carService = carService;
        }

        public async Task<object> CancelReservation(Reservation reservationToCancel)
        {
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == reservationToCancel.Id);
            try
            {
                reservation.AirlineReservation.Flight.SeatConfiguration.Seats[reservation.AirlineReservation.RowNumber].Seats[reservation.AirlineReservation.SeatNumber].Passenger = null;
                reservation.AirlineReservation.Flight.SeatConfiguration.Seats[reservation.AirlineReservation.RowNumber].Seats[reservation.AirlineReservation.SeatNumber].SeatStatus = "FREE";
                reservation.AirlineReservation.Passenger = null;
                //ovde treba odustati i od car-a ako je tako po specifikaciji
            }
            catch (Exception e)
            {
                Trace.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }


            try
            {
                _context.Remove(reservation);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Trace.WriteLine(dex.Message);
                return HttpStatusCode.InternalServerError;
            }


            return reservation;
        }

        public async Task<object> CreateReservation(Reservation reservation)
        {
            //var seat = (await _context.Seat.ToListAsync()).FirstOrDefault(s => s.Id == seatRequest.Id);
            var user = (await _userManager.FindByEmailAsync(reservation.AirlineReservation.Passenger.Email));
            var role = await _userManager.GetRolesAsync(user);
            
            //red i vrsta => rowNo seatNo
            var flight = (await _context.Flight.ToListAsync()).FirstOrDefault(f => f.Id == reservation.AirlineReservation.Flight.Id);
            var seat = flight.SeatConfiguration.Seats[reservation.AirlineReservation.RowNumber].Seats[reservation.AirlineReservation.SeatNumber];

            AirlineReservation airlineReservation;
            CarReservation carReservation;

            try
            {
                seat.Passenger = user;
                seat.SeatStatus = "TAKEN";
          
                await _context.SaveChangesAsync();

                if (reservation.AirlineReservation == null)
                {
                    airlineReservation = null;
                }
                else
                {
                    airlineReservation = new AirlineReservation()
                    {
                        Flight = flight,
                        Passenger = user,
                        DeadlineForCanceling = reservation.AirlineReservation.DeadlineForCanceling,
                        RowNumber = reservation.AirlineReservation.RowNumber,
                        SeatNumber = reservation.AirlineReservation.SeatNumber,
                        ConfirmDate = ""
                    };

                    await _context.AirlineReservation.AddAsync(airlineReservation);
                    await _context.SaveChangesAsync();
                }
                

                if(reservation.CarReservation == null)
                {
                    carReservation = null;
                }
                else
                {
                    
                    var carResModel = new CarReservationModel()
                    {
                        Car = reservation.CarReservation.Car,
                        CarId = reservation.CarReservation.CarId,
                        EndDate = reservation.CarReservation.EndDate,
                        StartDate = reservation.CarReservation.StartDate,
                        FullPrice = reservation.CarReservation.FullPrice,
                        UserEmail = reservation.CarReservation.UserEmail
                    };

                    carReservation = await _carService.MakeReservation(carResModel);
                    //_context.CarReservations.Add(carReservation);
                    //await _context.SaveChangesAsync();
                }


                var fullReservation = new Reservation()
                {
                    AirlineReservation = airlineReservation,
                    CarReservation = carReservation,
                    Taken = reservation.Taken,           //da li je napustena tj otkazana
                    IsFinished = reservation.IsFinished  //na osnovu ovoga znamo da li je zavrsena
                };

                await _context.Reservation.AddAsync(fullReservation);
                await _context.SaveChangesAsync();


                return fullReservation;
            }
            catch (DbException dex)
            {
                Console.WriteLine(dex);
                return HttpStatusCode.InternalServerError;
            }


            
        }

        public async Task<object> DeleteReservation(long reservationId)
        {
            throw new NotImplementedException();
        }

        public async Task<object> FinishReservation(long reservationId)
        {
            Reservation reservation;
            try
            {
                reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == reservationId);
            }
            catch(Exception e)
            {
                Trace.WriteLine(e.ToString());
                return HttpStatusCode.BadRequest;
            }

            reservation.IsFinished = true;

            try
            {
                await _context.SaveChangesAsync();
            }catch(DbException dex)
            {
                Trace.WriteLine(dex.ToString());
                return HttpStatusCode.InternalServerError;
            }

            return reservation;
        }

        public async Task<List<Reservation>> GetAllReservations()
        {
            return await _context.Reservation.ToListAsync();
        }

        public async Task<object> RateReservation(FlightRating flightRating)
        {
            var flight = (await _context.Flight.ToListAsync()).FirstOrDefault(f => f.Id == flightRating.FlightId);
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.AirlineReservation.Flight.Id == flight.Id);
            
            var rating = new FlightRating()
            {
                Rating = flightRating.Rating,
                FlightId = flightRating.Id,
                UserEmail = flightRating.UserEmail
            };

            try
            {
                flight.RateSum = flight.RateSum + flightRating.Rating;
                flight.RateNo = flight.RateNo + 1;
                flight.Rating = flight.RateSum / flight.RateNo;

                reservation.AirlineReservation.Rating = flightRating.Rating;
            }
            catch (Exception e)
            {
                Trace.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }

            try
            {
                await _context.FlightRating.AddAsync(rating);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Trace.WriteLine(dex.Message);
                return HttpStatusCode.InternalServerError;
            }

            


            return rating;
        }
    }
}

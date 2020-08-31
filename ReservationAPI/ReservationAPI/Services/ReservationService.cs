using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.Models.Shared;
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

        public async Task<object> AcceptReservation(long reservationId)
        {
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == reservationId);
            if (reservation != null)
            {
                reservation.Status = "CONFIRMED";
                await _context.SaveChangesAsync();
            }
            return HttpStatusCode.BadRequest;
        }


        public async Task<object> DeclineReservation(long reservationId)
        {
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == reservationId);
            if (reservation != null)
            {
                reservation.Status = "DECLINED";
                await _context.SaveChangesAsync();
            }
            return HttpStatusCode.BadRequest;
        }





        public async Task<object> CancelReservation(Reservation reservationToCancel)
        {
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == reservationToCancel.Id);
            var airlineReservation = (await _context.AirlineReservation.ToListAsync()).FirstOrDefault(ar => ar.Id == reservationToCancel.AirlineReservation.Id);
            var seatConfiguration = (await _context.SeatConfiguration.ToListAsync()).FirstOrDefault(sc => sc.Id == airlineReservation.Flight.SeatConfiguration.Id);
            Seat seat = airlineReservation.Flight.SeatConfiguration.Seats[reservation.AirlineReservation.RowNumber].Seats[reservation.AirlineReservation.SeatNumber];
            var s = (await _context.Seat.ToListAsync()).FirstOrDefault(sc => sc.Id == seat.Id);
            try
            {
                seat.SeatStatus = "FREE";
                seat.PassengerEmail = "";

                _context.Seat.Update(seat);

                //_context.Update(seat);
                airlineReservation.PassengerEmail = "";
                await _context.SaveChangesAsync();
                //ovde treba odustati i od car-a ako je tako po specifikaciji
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }


            try
            {
                _context.Remove(reservation);
                await _context.SaveChangesAsync();

                _context.Remove(airlineReservation);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Console.WriteLine(dex.Message);
                return HttpStatusCode.InternalServerError;
            }


            return reservation;
        }


        public async Task<object> CreateReservation(Reservation reservation, string initiatorEmail)
        {
            AirlineReservation airlineReservation;
            CarReservation carReservation;
            User user;

            if (reservation.AirlineReservation != null)
            {
                user = (await _userManager.FindByEmailAsync(reservation.AirlineReservation.PassengerEmail));    //user koji sedi                                                                                                                       //ako je to taj user treba mu postaviti status rezervacije na CONFIRMED da bi bila vidljiva na profilu
                var role = await _userManager.GetRolesAsync(user);
            }
            else
            {
                user = await _userManager.FindByEmailAsync(reservation.CarReservation.UserEmail);
            }


            try
            {

                if (reservation.AirlineReservation == null)
                {
                    airlineReservation = null;
                }
                else
                {
                    //red i vrsta => rowNo seatNo
                    var flight = (await _context.Flight.ToListAsync()).FirstOrDefault(f => f.Id == reservation.AirlineReservation.Flight.Id);
                    var seat = flight.SeatConfiguration.Seats[reservation.AirlineReservation.RowNumber].Seats[reservation.AirlineReservation.SeatNumber];


                    seat.PassengerEmail = user.Email;
                    seat.SeatStatus = "TAKEN";

                    await _context.SaveChangesAsync();
                    airlineReservation = new AirlineReservation()
                    {
                        Flight = flight,
                        PassengerEmail = user.Email,
                        DeadlineForCanceling = reservation.AirlineReservation.DeadlineForCanceling,
                        RowNumber = reservation.AirlineReservation.RowNumber,
                        SeatNumber = reservation.AirlineReservation.SeatNumber,
                        ConfirmDate = ""
                    };

                    await _context.AirlineReservation.AddAsync(airlineReservation);
                    await _context.SaveChangesAsync();
                }


                if (reservation.CarReservation == null)
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

                }


                var fullReservation = new Reservation()
                {
                    AirlineReservation = airlineReservation,
                    CarReservation = carReservation,
                    Status = (user.Email == initiatorEmail) ? "CONFIRMED" : reservation.Status,           //da li je napustena tj otkazana (UNCONFIRMED polje iz Ang)
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
            catch (Exception e)
            {
                Trace.WriteLine(e.ToString());
                return HttpStatusCode.BadRequest;
            }

            reservation.IsFinished = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
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
            //var flight = (await _context.Flight.ToListAsync()).FirstOrDefault(f => f.Id == flightRating.FlightId);
            var reservation = (await _context.Reservation.ToListAsync()).FirstOrDefault(r => r.Id == flightRating.ReservationId);
            var flight = reservation.AirlineReservation.Flight;
            var rating = new FlightRating()
            {
                Rating = flightRating.Rating,
                ReservationId = reservation.Id,
                UserEmail = flightRating.UserEmail
            };

            try
            {
                flight.RateSum = flight.RateSum + flightRating.Rating;
                flight.RateNo = flight.RateNo + 1;
                flight.Rating = (double)flight.RateSum / flight.RateNo;

                reservation.AirlineReservation.Rating = flightRating.Rating;

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Trace.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }

            await _context.FlightRating.AddAsync(rating);
            await _context.SaveChangesAsync();

            return rating;
        }
    }
}

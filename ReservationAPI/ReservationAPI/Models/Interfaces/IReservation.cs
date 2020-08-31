using ReservationAPI.Models.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    public interface IReservation
    {
        /*
         izlistavanje rezervacija, kreiranje, delete (samo ukloniti usera)
         */
        Task<List<Reservation>> GetAllReservations();
        Task<object> CreateReservation(Reservation r, string initiatorEmail);
        Task<object> DeleteReservation(long reservationId);
        Task<object> FinishReservation(long reservationId);
        Task<object> RateReservation(FlightRating flightRating);
        Task<object> CancelReservation(Reservation reservation);

        Task<Object> AcceptReservation(long reservationId);
        Task<Object> DeclineReservation(long reservationId);
    }
}

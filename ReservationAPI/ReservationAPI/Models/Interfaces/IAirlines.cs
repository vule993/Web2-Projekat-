﻿using ReservationAPI.Models.Airlines;
using ReservationAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Interfaces
{
    /*AIRLINE COMPANY*/
    public interface IAirlines
    {
        #region CompanyProfile
        Task<bool> UpdateCompanyInfo(AirlineCompany company);
        Task<AirlineCompany> GetCompany(string email);
        Task<AirlineCompany> GetCompanyById(string id);
        Task<IEnumerable<AirlineCompany>> GetAllCompanies();
        Task DeleteCompany(long id);
        Task <object> RateCompany(FlightCompanyRating rating);
        Task<List<FlightCompanyRating>> GetAllCompanyRatings(long id);
        #endregion

        #region DESTINATIONS
        Task<bool> CreateDestination(AirlineCompany id, Destination destination);
        Task<IEnumerable<Destination>> GetDestinations();
        Task<Destination> GetDestination(string id);
        Task<bool> DeleteDestination(long id);
        //Available Destinations
        Task<bool> CreateAvailableDestination(AirlineCompany id, AvailableDestination destination);
        Task<IEnumerable<AvailableDestination>> GetAvailableDestinations();
        Task<AvailableDestination> GetAvailableDestination(string id);
        Task<bool> DeleteAvailableDestination(long id);
        #endregion

        #region FLIGHTS
        Task<IEnumerable<Flight>> GetAllFlights();
        Task<bool> CreateFlight(Flight flight);
        Task<bool> DeleteFlight(long id);
        Task<object> GetFlight(long id);
        #endregion

        #region DISCOUNTS
        Task<IEnumerable<Discount>> GetAllDiscounts();
        Task<Discount> GetDiscount(string id);
        Task<bool> CreateDiscount(Discount discount);
        Task<object> DeleteDiscount(long id);
        #endregion

        #region SEAT CONFIGURATIONS
        Task<IEnumerable<SeatConfiguration>> GetAllSeatConfigurations();
        Task<SeatConfiguration> GetSeatConfiguration(string id);
        Task<bool> CreateSeatConfiguration(SeatConfiguration seatConfiguraiton);
        Task<bool> DeleteSeatConfiguration(long id);

        #endregion

        #region PLANE TYPES
        Task<IEnumerable<PlaneType>> GetAllPlaneTypes();
        Task<PlaneType> GetPlaneType(string id);
        Task<bool> CreatePlaneType(PlaneType planeType);
        Task<bool> DeletePlaneType(long id);
        #endregion

        #region OTHER SERVICES
        Task<IEnumerable<PlaneService>> GetAllServices();
        Task<bool> CreateService(PlaneService planeService);
        Task<bool> DeleteService(long id);
        //Available services
        Task<IEnumerable<AvailableService>> GetAllAvailableServices();
        Task<bool> CreateAvailableService(AvailableService availableService);
        Task<bool> DeleteAvailableService(long id);
        #endregion
    }
}

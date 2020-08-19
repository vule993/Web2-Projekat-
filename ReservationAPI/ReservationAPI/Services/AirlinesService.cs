using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using NuGet.Frameworks;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class AirlinesService : IAirlines
    {
        private readonly ApplicationDbContext _context;
        public AirlinesService(ApplicationDbContext context)
        {
            _context = context;
        }

        #region COMPANY PROFILE

        public async Task<AirlineCompany> GetCompany(string email)
        {
            AirlineCompany profile = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(x => x.AdminEmail == email);
            return profile;
        }

        public async Task<IEnumerable<AirlineCompany>> GetAllCompanies()
        {
            IEnumerable<AirlineCompany> companies = await _context.AirlineCompany.ToListAsync();
            return companies;
        }

        public async Task<bool> UpdateCompanyInfo(AirlineCompany company)
        {
            AirlineCompany profile = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(x => x.Id == company.Id);
            
            profile.Name = company.Name;

            profile.Address.City = company.Address.City;
            profile.Address.Street = company.Address.Street;
            profile.Address.Country = company.Address.Country;

            profile.Description = company.Description;

            try
            {
                _context.AirlineCompany.Update(profile);
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception e)
            {
                
            }

            return false;
        }

        public async Task DeleteCompany(long id)
        {
            var company = await _context.AirlineCompany.FindAsync(id);

            _context.AirlineCompany.Remove(company);
            await _context.SaveChangesAsync();
        }
        #endregion


        #region DESTINATIONS

        public async Task<Destination> GetDestination(string id)
        {
            var destination = (await _context.Destination.ToListAsync()).FirstOrDefault(d => d.Id.ToString() == id);
            return destination;
        }
        
        public async Task<IEnumerable<Destination>> GetDestinations()
        {
            var destinations = await _context.Destination.ToListAsync();
            return destinations;
        }

        public async Task<bool> CreateDestination(AirlineCompany airlineCompany, Destination destination)
        {

            //LOGIKA NIJE DOBRA, DESTINACIJE SE MOGU PONAVLJATI ZA VISE RAZLICITIH KOMPANIJA AIR SERBIA I MONTENEGRO AIRLINES MOGU IMATI LET DO RIMA NPR.

            foreach(var d in _context.Destination)
            {
                if(d.AirportName == destination.AirportName)
                {
                    return false;
                }
            }
          
            await _context.Destination.AddAsync(destination);
            await _context.SaveChangesAsync();

            return true;
            
        }

        public async Task<bool> DeleteDestination(long id)
        {
            var destination = (await _context.Destination.ToListAsync()).FirstOrDefault(x=>x.Id == id);
            _context.Destination.Remove(destination);
            await _context.SaveChangesAsync();
            return true;
        }

        #endregion


        #region FLIGHTS

        public async Task<IEnumerable<Flight>> GetAllFlights()
        {
            try
            {
                return await _context.Flight.ToListAsync();
            }catch(Exception e)
            {
                return null;
            }
        }

        public async Task<bool> CreateFlight(Flight flight)
        {
            try
            {

                var company = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(x => x.Id == flight.AvioCompany.Id);
                var seatConfig = (await _context.SeatConfiguration.ToListAsync()).FirstOrDefault(x => x.Id == flight.PlaneType.Id);
                List<Destination> destinations = new List<Destination>();

                for(var i = 0; i<flight.Destinations.Count; i++)
                {
                    destinations.Add((await _context.Destination.ToListAsync()).FirstOrDefault(x => x.Id == flight.Destinations[i].Id));
                }

                var f = new Flight()
                {
                    AvioCompany = company,
                    StartDate = flight.StartDate,
                    ArrivingDate = flight.ArrivingDate,
                    StartTime = flight.StartTime,
                    ArrivingTime = flight.ArrivingTime,
                    EstimationTime = flight.EstimationTime,
                    Distance = flight.Distance,
                    Discount = flight.Discount,
                    PlaneType = seatConfig,
                    Destinations = destinations,
                    OtherServices = flight.OtherServices,
                    Price = flight.Price,
                    Luggage = flight.Luggage,
      
                };


                _context.Flight.Add(f);
                await _context.SaveChangesAsync();
                
                return true;
            }catch(Exception e)
            {
                return false;
            }
            

        }

        public Task<bool> DeleteFlight(long id)
        {
            throw new NotImplementedException();
        }

        #endregion


        #region SEAT CONFIGURATIONS

        public async Task<IEnumerable<SeatConfiguration>> GetAllSeatConfigurations()
        {
            return await _context.SeatConfiguration.ToListAsync();
        }

        public async Task<SeatConfiguration> GetSeatConfiguration(string id)
        {
            return  (await _context.SeatConfiguration.ToListAsync()).FirstOrDefault(x=>x.Id == Int64.Parse(id));
        }

        public async Task<bool> CreateSeatConfiguration(SeatConfiguration seatConfiguration)
        {
            try
            {
                _context.SeatConfiguration.Add(seatConfiguration);
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception e)
            {
                return false;
            }
        }

        public Task<bool> DeleteSeatConfiguration(long id)
        {
            throw new NotImplementedException();
        }

        #endregion


    }
}

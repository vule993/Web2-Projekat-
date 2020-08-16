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

        public async Task<bool> CreateFlight(Flight flight)
        {

            try
            {
                _context.Flight.Add(flight);
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

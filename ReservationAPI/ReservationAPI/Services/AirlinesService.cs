using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
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
        public async Task<bool> CreateDestination(AirlineCompany airlineCompany, Destination destination)
        {
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
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Shared;
using ReservationAPI.ViewModels;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private ApplicationDbContext _context;


        public RatingController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddRate(RatingModel model)
        {
            /*
             sad da li ovde treba ispitivati da l je u ratingu carId != 0 pa ako jeste dodavati
             rating.rate u hashset iz car-a i isto to i za car kompaniju?
             */
            try
            {
                Rating rating = new Rating()
                {
                    UserEmail = model.UserEmail,
                    Rate = model.Rate,
                    CarCompanyId = model.CarCompanyId,
                    CarId = model.CarId
                };


                await _context.Ratings.AddAsync(rating);
                await _context.SaveChangesAsync();

                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine($"ERROR: [{e.Message}]");
                return false;
            }
        }

    }
}

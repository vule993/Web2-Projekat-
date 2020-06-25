using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Rent_a_Car;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarCompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarCompaniesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CarCompanies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarCompany>>> GetCarCompanies()
        {
            return await _context.CarCompanies.ToListAsync();
        }

        // GET: api/CarCompanies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarCompany>> GetCarCompany(long id)
        {
            var carCompany = await _context.CarCompanies.FindAsync(id);

            if (carCompany == null)
            {
                return NotFound();
            }

            return carCompany;
        }

        // PUT: api/CarCompanies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarCompany(long id, CarCompany carCompany)
        {
            if (id != carCompany.Id)
            {
                return BadRequest();
            }

            _context.Entry(carCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarCompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CarCompanies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<CarCompany>> PostCarCompany(CarCompany carCompany)
        {
            _context.CarCompanies.Add(carCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarCompany", new { id = carCompany.Id }, carCompany);
        }

        // DELETE: api/CarCompanies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CarCompany>> DeleteCarCompany(long id)
        {
            var carCompany = await _context.CarCompanies.FindAsync(id);
            if (carCompany == null)
            {
                return NotFound();
            }

            _context.CarCompanies.Remove(carCompany);
            await _context.SaveChangesAsync();

            return carCompany;
        }

        private bool CarCompanyExists(long id)
        {
            return _context.CarCompanies.Any(e => e.Id == id);
        }
    }
}

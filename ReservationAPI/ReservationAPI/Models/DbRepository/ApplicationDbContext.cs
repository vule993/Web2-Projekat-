using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.Rent_a_Car;
using ReservationAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.DbRepository
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        //cars
        public DbSet<User> Users { get; set; }
        public DbSet<CarCompany> CarCompanies { get; set; }
        public DbSet<Car> Car { get; set; }
        //airlines
        public DbSet<AirlineCompany> AirlineCompany { get; set; }
        public DbSet<AirlineReservation> AirlineReservations { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Row> Rows { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<SeatConfiguration> SeatConfiguration { get; set; }
        ////shared
        public DbSet<Address> Address { get; set; }
        ////public DbSet<Company> Companies { get; set; }       //ne znam da l je ovo potrebno
        //public DbSet<Notification> Notifications { get; set; }
        //public DbSet<Reservation> Reservations { get; set; }



    }
}

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Entities;
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
        public ApplicationDbContext(DbContextOptions options) : base(options){}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        //cars
        public DbSet<User> Users { get; set; }
        public DbSet<CarCompany> CarCompanies { get; set; }
        public DbSet<Car> Car { get; set; }
        public DbSet<CarReservation> CarReservations { get; set; }
        //airlines
        public DbSet<AirlineCompany> AirlineCompany { get; set; }
        public DbSet<AirlineReservation> AirlineReservation { get; set; }
        public DbSet<Destination> Destination { get; set; }
        public DbSet<Flight> Flight { get; set; }
        //public DbSet<Passenger> Passenger { get; set; }
        public DbSet<Row> Row { get; set; }
        public DbSet<Seat> Seat { get; set; }
        public DbSet<SeatConfiguration> SeatConfiguration { get; set; }
        public DbSet<PlaneService> PlaneService { get; set; }
        public DbSet<PlaneType> PlaneType { get; set; }
        public DbSet<AvailableDestination> AvailableDestination { get; set; }
        public DbSet<AvailableService> AvailableService { get; set; }

        public DbSet<FlightRating> FlightRating { get; set; }
        public DbSet<Discount> Discount { get; set; }
        public DbSet<FlightCompanyRating> CompanyRatings { get; set; }
        ////shared
        public DbSet<Address> Address { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<ReservationNotification> ReservationNotification { get; set; }
        //public DbSet<Friend> Friend { get; set; }
        public DbSet<UserFriend> Friends { get; set; }

        ////public DbSet<Company> Companies { get; set; }       //ne znam da l je ovo potrebno
        //public DbSet<Notification> Notifications { get; set; }
        //public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<Entities.UserFriend>().HasKey(k => (new { k.SourceUserId, k.DestinationUserId }));

            builder.Entity<Entities.UserFriend>()
                        .HasOne(f => f.SourceUser)
                        .WithMany()
                        .HasForeignKey(f => f.SourceUserId)
                        .OnDelete(DeleteBehavior.NoAction);
                        
            builder.Entity<Entities.UserFriend>()
                        .HasOne(f => f.DestinationUser)
                        .WithMany()
                        .HasForeignKey(f => f.DestinationUserId);

        }


    }
}

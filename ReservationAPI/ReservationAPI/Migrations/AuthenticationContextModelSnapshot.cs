﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReservationAPI.Models.DbRepository;

namespace ReservationAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class AuthenticationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.AirlineCompany", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AddressId")
                        .HasColumnType("bigint");

                    b.Property<string>("AdminEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Likes")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("AirlineCompany");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.AirlineReservation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("FlightId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("AirlineReservation");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Destination", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("AirlineCompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("AirportName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("FlightId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("AirlineCompanyId");

                    b.HasIndex("FlightId");

                    b.ToTable("Destination");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Flight", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ArrivingDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ArrivingTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("AvioCompanyId")
                        .HasColumnType("bigint");

                    b.Property<short>("Discount")
                        .HasColumnType("smallint");

                    b.Property<string>("Distance")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EstimationTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Luggage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OtherServices")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("PlaneTypeId")
                        .HasColumnType("bigint");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StartTime")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AvioCompanyId");

                    b.HasIndex("PlaneTypeId");

                    b.ToTable("Flight");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Passenger", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("ApprovedAirlineSeat")
                        .HasColumnType("bit");

                    b.Property<bool>("ApprovedCarSeat")
                        .HasColumnType("bit");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Passenger");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Reservation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AirlineCompanyId")
                        .HasColumnType("bigint");

                    b.Property<long?>("AirlineReservationId")
                        .HasColumnType("bigint");

                    b.Property<long?>("CarReservationId")
                        .HasColumnType("bigint");

                    b.Property<bool>("IsFinished")
                        .HasColumnType("bit");

                    b.Property<bool>("Taken")
                        .HasColumnType("bit");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("UserModelId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirlineCompanyId");

                    b.HasIndex("AirlineReservationId");

                    b.HasIndex("CarReservationId");

                    b.HasIndex("UserId");

                    b.HasIndex("UserModelId");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Row", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("SeatConfigurationId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("SeatConfigurationId");

                    b.ToTable("Row");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Seat", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("PassengerId")
                        .HasColumnType("bigint");

                    b.Property<long?>("RowId")
                        .HasColumnType("bigint");

                    b.Property<int>("SeatNo")
                        .HasColumnType("int");

                    b.Property<bool>("SeatReservationConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("Taken")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("PassengerId");

                    b.HasIndex("RowId");

                    b.ToTable("Seat");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.SeatConfiguration", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AirlineCompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<short>("SegmentsHeight")
                        .HasColumnType("smallint");

                    b.Property<short>("segmentFourWidth")
                        .HasColumnType("smallint");

                    b.Property<short>("segmentOneWidth")
                        .HasColumnType("smallint");

                    b.Property<short>("segmentThreeWidth")
                        .HasColumnType("smallint");

                    b.Property<short>("segmentTwoWidth")
                        .HasColumnType("smallint");

                    b.Property<short>("segmentsNumber")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("AirlineCompanyId");

                    b.ToTable("SeatConfiguration");
                });

            modelBuilder.Entity("ReservationAPI.Models.Rent_a_Car.Car", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("CarCompanyId")
                        .HasColumnType("bigint");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsReserved")
                        .HasColumnType("bit");

                    b.Property<string>("Mark")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.Property<int>("Seats")
                        .HasColumnType("int");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CarCompanyId");

                    b.ToTable("Car");
                });

            modelBuilder.Entity("ReservationAPI.Models.Rent_a_Car.CarCompany", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Admin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.Property<string>("Thumbnail")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CarCompanies");
                });

            modelBuilder.Entity("ReservationAPI.Models.Rent_a_Car.CarReservation", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("CarId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<double>("FullPrice")
                        .HasColumnType("float");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserEmail")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("CarReservation");
                });

            modelBuilder.Entity("ReservationAPI.Models.Shared.Address", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("ReservationAPI.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserModelId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserModelId");

                    b.ToTable("UserModel");
                });

            modelBuilder.Entity("ReservationAPI.Models.User", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasIndex("UserId");

                    b.HasDiscriminator().HasValue("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.AirlineCompany", b =>
                {
                    b.HasOne("ReservationAPI.Models.Shared.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.AirlineReservation", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Destination", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.AirlineCompany", null)
                        .WithMany("Destinations")
                        .HasForeignKey("AirlineCompanyId");

                    b.HasOne("ReservationAPI.Models.Airlines.Flight", null)
                        .WithMany("Destinations")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Flight", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.AirlineCompany", "AvioCompany")
                        .WithMany()
                        .HasForeignKey("AvioCompanyId");

                    b.HasOne("ReservationAPI.Models.Airlines.SeatConfiguration", "PlaneType")
                        .WithMany()
                        .HasForeignKey("PlaneTypeId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Passenger", b =>
                {
                    b.HasOne("ReservationAPI.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Reservation", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.AirlineCompany", null)
                        .WithMany("Flights")
                        .HasForeignKey("AirlineCompanyId");

                    b.HasOne("ReservationAPI.Models.Airlines.AirlineReservation", "AirlineReservation")
                        .WithMany()
                        .HasForeignKey("AirlineReservationId");

                    b.HasOne("ReservationAPI.Models.Rent_a_Car.CarReservation", "CarReservation")
                        .WithMany()
                        .HasForeignKey("CarReservationId");

                    b.HasOne("ReservationAPI.Models.User", null)
                        .WithMany("Reservations")
                        .HasForeignKey("UserId");

                    b.HasOne("ReservationAPI.Models.UserModel", null)
                        .WithMany("Reservations")
                        .HasForeignKey("UserModelId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Row", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.SeatConfiguration", null)
                        .WithMany("Seats")
                        .HasForeignKey("SeatConfigurationId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.Seat", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.Passenger", "Passenger")
                        .WithMany()
                        .HasForeignKey("PassengerId");

                    b.HasOne("ReservationAPI.Models.Airlines.Row", null)
                        .WithMany("Seats")
                        .HasForeignKey("RowId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Airlines.SeatConfiguration", b =>
                {
                    b.HasOne("ReservationAPI.Models.Airlines.AirlineCompany", null)
                        .WithMany("SeatConfigurations")
                        .HasForeignKey("AirlineCompanyId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Rent_a_Car.Car", b =>
                {
                    b.HasOne("ReservationAPI.Models.Rent_a_Car.CarCompany", null)
                        .WithMany("Cars")
                        .HasForeignKey("CarCompanyId");
                });

            modelBuilder.Entity("ReservationAPI.Models.Rent_a_Car.CarReservation", b =>
                {
                    b.HasOne("ReservationAPI.Models.Rent_a_Car.Car", "Car")
                        .WithMany()
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ReservationAPI.Models.UserModel", b =>
                {
                    b.HasOne("ReservationAPI.Models.UserModel", null)
                        .WithMany("Friends")
                        .HasForeignKey("UserModelId");
                });

            modelBuilder.Entity("ReservationAPI.Models.User", b =>
                {
                    b.HasOne("ReservationAPI.Models.User", null)
                        .WithMany("Friends")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}

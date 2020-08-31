using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using NuGet.Frameworks;
using ReservationAPI.Models;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.ViewModels;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Numerics;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class AirlinesService : IAirlines
    {
        private readonly ApplicationDbContext _context;
        private UserManager<User> _userManager;
        public AirlinesService(ApplicationDbContext context,UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        #region COMPANY PROFILE

        public async Task<AirlineCompany> GetCompanyById(string id)
        {
            AirlineCompany profile = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(x => x.Id.ToString() == id);
            return profile;
        }
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


        public async Task<object> RateCompany(FlightCompanyRating rating)
        {
            AirlineCompany company;
            try
            {
                company = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(c => c.Id == rating.CompanyId);
            }catch(Exception e)
            {
                Trace.WriteLine(e.ToString());
                return HttpStatusCode.BadRequest;
            }

            var rate = new FlightCompanyRating()
            {
                CompanyId = rating.CompanyId,
                Rating = rating.Rating,
                UserEmail = rating.UserEmail
            };


            try
            {
                await _context.CompanyRatings.AddAsync(rate);
                await _context.SaveChangesAsync();
            }
            catch (DbException dex)
            {
                Trace.WriteLine(dex.ToString());
                return HttpStatusCode.InternalServerError;
            }

            company.RateNo = company.RateNo + 1;
            company.RateSum = company.RateSum + rating.Rating;
            company.Rating = (double)company.RateSum / company.RateNo;

            try
            {
                await _context.SaveChangesAsync();
            }catch(DbException dex)
            {
                Trace.WriteLine(dex.ToString());
                return HttpStatusCode.InternalServerError;
            }


            return company;
        }

        public async Task<List<FlightCompanyRating>> GetAllCompanyRatings(long id)
        {
            return (await _context.CompanyRatings.ToListAsync()).FindAll(x=>x.CompanyId == id);
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


        //AvailableDestinations
        public async Task<AvailableDestination> GetAvailableDestination(string id)
        {
            var destination = (await _context.AvailableDestination.ToListAsync()).FirstOrDefault(d => d.Id.ToString() == id);
            return destination;
        }

        public async Task<IEnumerable<AvailableDestination>> GetAvailableDestinations()
        {
            var destinations = await _context.AvailableDestination.ToListAsync();
            return destinations;
        }

        public async Task<bool> CreateAvailableDestination(AirlineCompany airlineCompany, AvailableDestination destination)
        {

            foreach (var d in _context.AvailableDestination)
            {
                if (d.AirportName == destination.AirportName && d.Status==true)
                {
                    return false;
                }
            }

            await _context.AvailableDestination.AddAsync(destination);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<bool> DeleteAvailableDestination(long id)
        {
            try
            {
                var destination = (await _context.AvailableDestination.ToListAsync()).FirstOrDefault(x => x.Id == id);
                destination.Status = false;
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception e)
            {
                return false;
            }
        }



        #endregion


        #region FLIGHTS

        public async Task<IEnumerable<Flight>> GetAllFlights()
        {
            return await _context.Flight.ToListAsync();
        }

        public async Task<bool> UpdateFlight(Flight flight)
        {
            try
            {
                //var f = (await _context.Flight.ToListAsync()).FirstOrDefault(x => x.Id == flight.Id);
                _context.Flight.Update(flight);
                await _context.SaveChangesAsync();

                return true;

            }
            catch(Exception e)
            {
                return false;
            }

            
        }


        public async Task<bool> CreateFlight(Flight flight)
        {
            try
            {

                AirlineCompany company = (await _context.AirlineCompany.ToListAsync()).FirstOrDefault(x => x.Id == flight.AvioCompany.Id);

                PlaneType planeType = (await _context.PlaneType.ToListAsync()).FirstOrDefault(x => x.Id == flight.SeatConfiguration.PlaneType.Id);
                

                List<Destination> destinations = new List<Destination>();   //ovo cemo dodati kao polje, to popunjavamo
                Destination destination;
                foreach(var d in flight.Destinations)
                {
                    destination = new Destination()
                    {
                        Address = d.Address,
                        City = d.City,
                        AirportName = d.AirportName,
                        Country = d.Country
                    };

                    await _context.Destination.AddAsync(destination);
                    destinations.Add(destination);
                }

                List<Row> allRows = new List<Row>();
                Row r;
                //List<Seat> seatsInRow = new List<Seat>();
                Seat s;
                for (var rowIndex = 0; rowIndex < flight.SeatConfiguration.Seats.Count; rowIndex++)
                {
                    r = new Row()
                    {
                        RowNo = rowIndex,
                        Seats = new List<Seat>()
                    };
                    foreach (var seat in flight.SeatConfiguration.Seats[rowIndex].Seats)
                    {
                        s = new Seat()
                        {
                            ForFastReservation = seat.ForFastReservation,
                            PassengerEmail = seat.PassengerEmail,
                            SeatNo = seat.SeatNo,
                            SeatStatus = seat.SeatStatus,
                        };

                        await _context.Seat.AddAsync(s);
                        await _context.SaveChangesAsync();
                        r.Seats.Add(s);
                    }

                    await _context.Row.AddAsync(r);
                    allRows.Add(r);
                }
                //cuvam sve prethodne promene
                //await _context.SaveChangesAsync();


                SeatConfiguration seatConfiguration = new SeatConfiguration()
                {
                    PlaneType = planeType,
                    Seats = allRows

                };

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
                    SeatConfiguration = seatConfiguration,
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

        public async Task<object> GetFlight(long id)
        {
            return (await _context.Flight.ToListAsync()).FirstOrDefault(f => f.Id == id);
        }

        #endregion


        #region DISCOUNTS

        public async Task<IEnumerable<Discount>> GetAllDiscounts()
        {
            return (await _context.Discount.ToListAsync()).FindAll(d => d.Status);
        }

        public async Task<Discount> GetDiscount(string id)
        {
            return (await _context.Discount.ToListAsync()).FirstOrDefault(x => x.Id == Int64.Parse(id));
        }

        public async Task<bool> CreateDiscount(Discount discount)
        {
            try
            {
                _context.Discount.Add(discount);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<object> DeleteDiscount(long id)
        {
            try
            {
                var discount = _context.Discount.ToList().FirstOrDefault(x => x.Id == id);
                discount.Status = false;
                await _context.SaveChangesAsync();

                return HttpStatusCode.OK;
            }catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return HttpStatusCode.BadRequest;
            }
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


        #region PLANE TYPES

        public async Task<IEnumerable<PlaneType>> GetAllPlaneTypes()
        {
            return await _context.PlaneType.ToListAsync();
        }

        public async Task<PlaneType> GetPlaneType(string id)
        {
            return (await _context.PlaneType.ToListAsync()).FirstOrDefault(x => x.Id == Int64.Parse(id));
        }

        public async Task<bool> CreatePlaneType(PlaneType planeType)
        {
            try
            {
                _context.PlaneType.Add(planeType);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Task<bool> DeletePlaneType(long id)
        {
            throw new NotImplementedException();
        }
        #endregion




        #region OTHER SERVICES


        public async Task<IEnumerable<PlaneService>> GetAllServices()
        {
            return await _context.PlaneService.ToListAsync();
        }

        public async Task<bool> CreateService(PlaneService planeService)
        {
            try
            {
                await _context.PlaneService.AddAsync(new PlaneService() { Name = planeService.Name, 
                Icon = planeService.Icon});
                await _context.SaveChangesAsync();
                return true;
            }catch(Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteService(long id)
        {
            try
            {
                var service = (await _context.PlaneService.ToListAsync()).FirstOrDefault(x => x.Id == id);
                if(service != null)
                {
                    _context.PlaneService.Remove(service);
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }catch(Exception e)
            {
                return false;
            }
        }

        //Available services

        public async Task<IEnumerable<AvailableService>> GetAllAvailableServices()
        {
            return await _context.AvailableService.ToListAsync();
        }

        public async Task<bool> CreateAvailableService(AvailableService availableService)
        {
            try
            {
                await _context.AvailableService.AddAsync(new AvailableService()
                {
                    Name = availableService.Name,
                    Icon = availableService.Icon,
                    Status = availableService.Status
                });
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAvailableService(long id)
        {
            try
            {
                var service = (await _context.AvailableService.ToListAsync()).FirstOrDefault(x => x.Id == id);
                if (service != null)
                {
                    service.Status = false;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        



        #endregion


    }
}

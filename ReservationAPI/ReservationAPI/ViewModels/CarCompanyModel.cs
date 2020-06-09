using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels
{
    public class CarCompanyModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Thumbnail { get; set; }
        public List<Car> Cars { get; set; }


        public CarCompanyModel(CarCompany carCompany)
        {
            Id = carCompany.Id;
            Name = carCompany.Name;
            Rating = carCompany.Rating;
            Description = carCompany.Description;
            Address = carCompany.Address;
            City = carCompany.City;
            Thumbnail = carCompany.Thumbnail;
            Cars = new List<Car>(carCompany.Cars);
        }
    }
}

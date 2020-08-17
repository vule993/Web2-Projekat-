using ReservationAPI.Models.Rent_a_Car;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels.RentACar
{
    public class AddCarToCompanyModel
    {
        public Car Car { get; set; }

        public long CompanyId { get; set; }
    }
}

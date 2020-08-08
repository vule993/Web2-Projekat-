using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.ViewModels.RentACar
{
    public class AddCarToCompanyModel
    {
        public long CarId { get; set; }

        public long CarCompanyId { get; set; }
    }
}

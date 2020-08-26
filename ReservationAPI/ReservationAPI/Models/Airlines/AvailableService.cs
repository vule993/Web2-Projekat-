﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models.Airlines
{
    public class AvailableService
    {
        public long Id { get; set; }
        public string Icon { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
    }
}

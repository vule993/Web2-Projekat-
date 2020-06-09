using ReservationAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class RefreshTokenService : IRefreshTokenGenerator
    {
        public string GenerateToken()
        {
            //random num (encrypted)
            var randomNumber = new byte[32];

            using(var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}

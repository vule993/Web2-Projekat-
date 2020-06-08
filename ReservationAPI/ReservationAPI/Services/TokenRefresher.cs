using Microsoft.IdentityModel.Tokens;
using ReservationAPI.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class TokenRefresher
    {
        private readonly byte[] key;

        public TokenRefresher(byte[] key)
        {
            this.key = key;
        }

        //public object RefreshToken(RefreshCred refreshCred)
        //{
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    SecurityToken validatedToken;
        //    var principal = tokenHandler.ValidateToken(refreshCred.JwtToken,
        //        new TokenValidationParameters
        //        {
        //            ValidateAudience = false,
        //            IssuerSigningKey = new SymmetricSecurityKey(key),
        //            ValidateIssuer = false,
        //            ClockSkew = TimeSpan.Zero //time span between server and client
        //        }, out validatedToken);

        //    var jwtToken = validatedToken as JwtSecurityToken;
        //    if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
        //        throw new SecurityTokenException("Invalid token!");

        //    var name = principal.Identity.Name;


        //}
    }
}

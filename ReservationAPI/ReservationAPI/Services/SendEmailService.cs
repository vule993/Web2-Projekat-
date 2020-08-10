using Microsoft.Extensions.Configuration;
using ReservationAPI.Models.Interfaces;
using System;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class SendEmailService : IMailService
    {
        private IConfiguration _config;

        public SendEmailService(IConfiguration config)
        {
            _config = config;
        }

        public Task SendEmailAsync(string toEmail, string subject, string content)
        {
            throw new NotImplementedException();
        }
    }
}

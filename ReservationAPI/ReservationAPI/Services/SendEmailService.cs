using Microsoft.Extensions.Configuration;
using ReservationAPI.Models.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task SendEmailAsync(string toEmail, string subject, string content)
        {
            var apiKey = _config["SendGridSettings:SendGridAPIKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("bookit000@gmail.com", "BookIT");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, content, content);
            _ = await client.SendEmailAsync(msg);

        }
    }
}

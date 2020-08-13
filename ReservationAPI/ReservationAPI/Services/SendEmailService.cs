using Microsoft.Extensions.Configuration;
using ReservationAPI.Models.Interfaces;
using System;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
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

        public async Task SendEmailAsync(string toEmail, string subject, string content, string from = "noreply@gmail.com")
        {
            var smtpHost = _config["ApplicationSettings:SmtpClientHost"];
            var port = _config["ApplicationSettings:SmtpClientPort"];
            var myEmail = _config["ApplicationSettings:MyEmail"];
            var myPass = _config["ApplicationSettings:MyPass"];

            var smtp = new SmtpClient(smtpHost, Int32.Parse(port))
            {
                Credentials = new NetworkCredential(myEmail, myPass),
                EnableSsl = true
            };

            using(MailMessage message = new MailMessage())
            {
                message.To.Add(toEmail);
                message.From = new MailAddress(from);
                message.Subject = subject;
                message.Body = content;
                message.IsBodyHtml = true;
                message.Priority = MailPriority.High;

                try
                {
                    await smtp.SendMailAsync(message);
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.Message);
                }
            }

        }
    }
}

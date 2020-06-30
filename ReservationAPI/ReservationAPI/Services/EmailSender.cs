using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using ReservationAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ReservationAPI.Services
{
    public class EmailSender : IEmailSender
    {
        string MailServer { get; set; }
        int MailPort { get; set; }
        string SenderName { get; set; }
        string Sender { get; set; }
        string Password { get; set; }


        public EmailSender(IOptions<EmailSettings> esop)
        {
            MailServer = esop.Value.MailServer;
            MailPort = esop.Value.MailPort;
            SenderName = esop.Value.SenderName;
            Sender = esop.Value.Sender;
            Password = esop.Value.Password;
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var smtp = new SmtpClient
            {
                Host = MailServer,
                Port = MailPort,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Sender, Password),
                Timeout = 20000
            };


            using (MailMessage message = new MailMessage(Sender, email)
            {
                Subject = subject,
                Body = htmlMessage,
                From = new MailAddress(Sender, SenderName)
            })
            {
                message.IsBodyHtml = true;
                smtp.Send(message);
            }

            return Task.CompletedTask;
        }

        public bool isValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}

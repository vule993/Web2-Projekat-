using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ReservationAPI.Helpers;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;
using ReservationAPI.Services;

namespace ReservationAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Inject AppSettings
            services.Configure<ApplicationSettings>(config.GetSection("ApplicationSettings"));

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddScoped<IUserRepository, UserService>();
            services.AddScoped<ICarRepository, CarService>();
            services.AddScoped<ICarCompany, CarCompanyService>();
            services.AddTransient<IMailService, SendEmailService>();
            services.AddScoped<IAirlines, AirlinesService>();
            services.AddScoped<IReservation, ReservationService>();
            services.AddScoped<IAirlineReservation, AirlineReservationService>();
            services.AddScoped<INotification, NotificationService>();

            services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlServer(config.GetConnectionString("IdentityConnection"))
            );

            //file upload
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddSignalR();

            return services;
        }
    }
}

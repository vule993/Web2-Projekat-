using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Models;
using ReservationAPI.Models.DbRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ReservationAPI.Data
{
    public class Seed
    {
        public static async Task SeedDb(ApplicationDbContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!(await context.Roles.AnyAsync()))
            {

                await roleManager.CreateAsync(new IdentityRole("Admin"));
                await roleManager.CreateAsync(new IdentityRole("CarAdmin"));
                await roleManager.CreateAsync(new IdentityRole("AvioAdmin"));
                await roleManager.CreateAsync(new IdentityRole("User"));
                await roleManager.CreateAsync(new IdentityRole("Guest"));

            }

            if (!(await context.Users.AnyAsync()))
            {
                User admin = new User()
                {
                    UserName = "Admin",
                    FirstName = "Head",
                    LastName = "Admin",
                    Email = "head@outlook.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0655230691",
                    Street = "Ljubinke Bobic 11/3",
                    City = "Belgrade",
                    Image = "",
                    Reservations = null,
                    PassportNo = ""
                };



                await userManager.CreateAsync(admin, "aaaa");
                await userManager.AddToRoleAsync(admin, "Admin");


            }



        }

    }
}

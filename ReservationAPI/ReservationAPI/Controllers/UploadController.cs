using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using ReservationAPI.Models.Airlines;
using ReservationAPI.Models.DbRepository;
using ReservationAPI.Models.Interfaces;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        /*
         OVDE MOZE DA SE UBACI INTERFEJS OD USER METODA, TREBA NAM UPDATE DA PROMENIMO SLIKU, ALI NIJE 
         IZDVOJEN INTERFEJS NI SERVIS, PA JE ODRADJENO OVAKO
         */
        private readonly ApplicationDbContext _context;
        IAirlines _airlineService;
        public UploadController(ApplicationDbContext context, IAirlines airlineService)
        {
            _context = context;
            _airlineService = airlineService;
        }



        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadFile")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                
                var file = Request.Form.Files[0];
                var extension = Path.GetExtension(file.FileName);
                //nakon ove 2 linije dobije se putanja
                //D://.........Resources/Site



                if(file.Length > 0)
                {
                    var email = HttpContext.Request.Form["email"];
                    var type = HttpContext.Request.Form["type"];
                    var name = HttpContext.Request.Form["name"];

                    var user = _context.Users.ToList().FirstOrDefault(x => x.Email == email);


                    String fileName = "", folderName = "", pathToSave = "" ;

                    if (type == "profilePicture")
                    {
                        //ako je u pitanju user koji menja profilnu hasujemo njegovu sliku na osnovu njegovog emaila kako bismo dobili
                        //jedinstveni naziv slike na serveru da ne bi doslo do gazenja
                        fileName = Hash(email) + extension;
                        folderName = Path.Combine("Resources", "Users");
                        pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                        user.Image = fileName;

                        _context.Users.Update(user);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        /*ako je admin u pitanju*/
                        fileName = name + extension;    //admin zadaje ime, kakvo je ime usluge tako je i ime slike, tako se i potrazuje
                        folderName = Path.Combine("Resources", "Site");
                        pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                        //pozivam servis za dodavanje servisa
                        await _airlineService.CreateAvailableService(new AvailableService() { Icon = fileName, Name = name, Status = true });
                    }

                    //smestam sliku na lokaciju
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);


                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }catch(Exception e)
            {
                return StatusCode(500, $"Internal server eror: {e}");
            }
        }

        string Hash(string input)
        {
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder(hash.Length * 2);

                foreach (byte b in hash)
                {
                    // can be "x2" if you want lowercase
                    sb.Append(b.ToString("X2"));
                }

                return sb.ToString();
            }
        }

    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class ReservationAdaptationFix1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passport_number",
                table: "Passenger");

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "Passenger",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "Passenger");

            migrationBuilder.AddColumn<string>(
                name: "Passport_number",
                table: "Passenger",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

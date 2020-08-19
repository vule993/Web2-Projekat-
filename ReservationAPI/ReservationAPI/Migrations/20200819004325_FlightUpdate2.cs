using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FlightUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Flight");

            migrationBuilder.AddColumn<string>(
                name: "ArrivingTime",
                table: "Flight",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivingTime",
                table: "Flight");

            migrationBuilder.AddColumn<string>(
                name: "EndTime",
                table: "Flight",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

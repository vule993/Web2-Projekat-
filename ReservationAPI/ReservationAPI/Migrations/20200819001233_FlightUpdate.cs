using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FlightUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Flight");

            migrationBuilder.AddColumn<string>(
                name: "ArrivingDate",
                table: "Flight",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArrivingDate",
                table: "Flight");

            migrationBuilder.AddColumn<string>(
                name: "EndDate",
                table: "Flight",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class ReservationAdaptationFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedAirlineSeat",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "ApprovedCarSeat",
                table: "Passenger");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ApprovedAirlineSeat",
                table: "Passenger",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ApprovedCarSeat",
                table: "Passenger",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

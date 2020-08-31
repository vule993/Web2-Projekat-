using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FlightRateUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "FlightRating");

            migrationBuilder.AddColumn<long>(
                name: "ReservationId",
                table: "FlightRating",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "FlightRating");

            migrationBuilder.AddColumn<long>(
                name: "FlightId",
                table: "FlightRating",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}

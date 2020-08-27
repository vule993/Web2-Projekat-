using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AirlineReservationUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RateNo",
                table: "Flight",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Flight",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ConfirmDate",
                table: "AirlineReservation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RateNo",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "ConfirmDate",
                table: "AirlineReservation");
        }
    }
}

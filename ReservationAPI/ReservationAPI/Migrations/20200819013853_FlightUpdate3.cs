using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FlightUpdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "luggage",
                table: "Flight",
                newName: "Luggage");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Luggage",
                table: "Flight",
                newName: "luggage");
        }
    }
}

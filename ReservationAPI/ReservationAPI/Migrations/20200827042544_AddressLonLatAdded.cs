using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AddressLonLatAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lat",
                table: "Address",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lon",
                table: "Address",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Address");

            migrationBuilder.DropColumn(
                name: "Lon",
                table: "Address");
        }
    }
}

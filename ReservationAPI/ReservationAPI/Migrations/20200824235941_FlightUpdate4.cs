using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FlightUpdate4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_SeatConfiguration_PlaneTypeId",
                table: "Flight");

            migrationBuilder.DropIndex(
                name: "IX_Flight_PlaneTypeId",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "PlaneTypeId",
                table: "Flight");

            migrationBuilder.AddColumn<long>(
                name: "SeatConfigurationId",
                table: "Flight",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flight_SeatConfigurationId",
                table: "Flight",
                column: "SeatConfigurationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_SeatConfiguration_SeatConfigurationId",
                table: "Flight",
                column: "SeatConfigurationId",
                principalTable: "SeatConfiguration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_SeatConfiguration_SeatConfigurationId",
                table: "Flight");

            migrationBuilder.DropIndex(
                name: "IX_Flight_SeatConfigurationId",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "SeatConfigurationId",
                table: "Flight");

            migrationBuilder.AddColumn<long>(
                name: "PlaneTypeId",
                table: "Flight",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flight_PlaneTypeId",
                table: "Flight",
                column: "PlaneTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_SeatConfiguration_PlaneTypeId",
                table: "Flight",
                column: "PlaneTypeId",
                principalTable: "SeatConfiguration",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class Flight_startingAndEndingDestinations_removed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Destination_EndingDestinationId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Destination_StartingDestinationId",
                table: "Flight");

            migrationBuilder.DropIndex(
                name: "IX_Flight_EndingDestinationId",
                table: "Flight");

            migrationBuilder.DropIndex(
                name: "IX_Flight_StartingDestinationId",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "EndingDestinationId",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "StartingDestinationId",
                table: "Flight");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "EndingDestinationId",
                table: "Flight",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StartingDestinationId",
                table: "Flight",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flight_EndingDestinationId",
                table: "Flight",
                column: "EndingDestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_StartingDestinationId",
                table: "Flight",
                column: "StartingDestinationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Destination_EndingDestinationId",
                table: "Flight",
                column: "EndingDestinationId",
                principalTable: "Destination",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Destination_StartingDestinationId",
                table: "Flight",
                column: "StartingDestinationId",
                principalTable: "Destination",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

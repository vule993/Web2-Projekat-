using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class added_carReservationKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_CarReservation_CarReservationId",
                table: "Reservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarReservation",
                table: "CarReservation");

            migrationBuilder.RenameTable(
                name: "CarReservation",
                newName: "CarReservations");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservations",
                newName: "IX_CarReservations_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarReservations",
                table: "CarReservations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservations_Car_CarId",
                table: "CarReservations",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_CarReservations_CarReservationId",
                table: "Reservation",
                column: "CarReservationId",
                principalTable: "CarReservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarReservations_Car_CarId",
                table: "CarReservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_CarReservations_CarReservationId",
                table: "Reservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarReservations",
                table: "CarReservations");

            migrationBuilder.RenameTable(
                name: "CarReservations",
                newName: "CarReservation");

            migrationBuilder.RenameIndex(
                name: "IX_CarReservations_CarId",
                table: "CarReservation",
                newName: "IX_CarReservation_CarId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarReservation",
                table: "CarReservation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_CarReservation_CarReservationId",
                table: "Reservation",
                column: "CarReservationId",
                principalTable: "CarReservation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

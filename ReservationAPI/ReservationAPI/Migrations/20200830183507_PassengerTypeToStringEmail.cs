using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class PassengerTypeToStringEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReservation_AspNetUsers_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Seat_AspNetUsers_PassengerId",
                table: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_Seat_PassengerId",
                table: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "AirlineReservation");

            migrationBuilder.AddColumn<string>(
                name: "PassengerEmail",
                table: "Seat",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassengerEmail",
                table: "AirlineReservation",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassengerEmail",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "PassengerEmail",
                table: "AirlineReservation");

            migrationBuilder.AddColumn<string>(
                name: "PassengerId",
                table: "Seat",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassengerId",
                table: "AirlineReservation",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Seat_PassengerId",
                table: "Seat",
                column: "PassengerId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReservation_AspNetUsers_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Seat_AspNetUsers_PassengerId",
                table: "Seat",
                column: "PassengerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

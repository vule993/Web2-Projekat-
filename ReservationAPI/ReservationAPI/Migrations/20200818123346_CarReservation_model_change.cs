using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class CarReservation_model_change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CarId",
                table: "CarReservation",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "CarReservation",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "FullPrice",
                table: "CarReservation",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "CarReservation",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "CarReservation",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservation",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation");

            migrationBuilder.DropIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "CarId",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "FullPrice",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "CarReservation");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "CarReservation");
        }
    }
}

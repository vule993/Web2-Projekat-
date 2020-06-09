using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class carchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassengerNumber",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "ReservedFrom",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "ReservedTo",
                table: "Car");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Car",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsReserved",
                table: "Car",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "IsReserved",
                table: "Car");

            migrationBuilder.AddColumn<int>(
                name: "PassengerNumber",
                table: "Car",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReservedFrom",
                table: "Car",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReservedTo",
                table: "Car",
                type: "datetime2",
                nullable: true);
        }
    }
}

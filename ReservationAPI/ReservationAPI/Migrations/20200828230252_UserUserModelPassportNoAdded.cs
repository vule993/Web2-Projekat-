using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class UserUserModelPassportNoAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PassportNo",
                table: "UserModel",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PassportNo",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassportNo",
                table: "UserModel");

            migrationBuilder.DropColumn(
                name: "PassportNo",
                table: "AspNetUsers");
        }
    }
}

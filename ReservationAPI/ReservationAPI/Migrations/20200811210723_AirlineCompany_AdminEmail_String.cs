using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AirlineCompany_AdminEmail_String : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineCompany_AspNetUsers_AdminId",
                table: "AirlineCompany");

            migrationBuilder.DropIndex(
                name: "IX_AirlineCompany_AdminId",
                table: "AirlineCompany");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "AirlineCompany");

            migrationBuilder.AddColumn<string>(
                name: "AdminEmail",
                table: "AirlineCompany",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminEmail",
                table: "AirlineCompany");

            migrationBuilder.AddColumn<string>(
                name: "AdminId",
                table: "AirlineCompany",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AirlineCompany_AdminId",
                table: "AirlineCompany",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineCompany_AspNetUsers_AdminId",
                table: "AirlineCompany",
                column: "AdminId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

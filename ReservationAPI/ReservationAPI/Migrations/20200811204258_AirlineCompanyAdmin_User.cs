using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AirlineCompanyAdmin_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineCompany_UserModel_AdminId",
                table: "AirlineCompany");

            migrationBuilder.AlterColumn<string>(
                name: "AdminId",
                table: "AirlineCompany",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineCompany_AspNetUsers_AdminId",
                table: "AirlineCompany",
                column: "AdminId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineCompany_AspNetUsers_AdminId",
                table: "AirlineCompany");

            migrationBuilder.AlterColumn<int>(
                name: "AdminId",
                table: "AirlineCompany",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineCompany_UserModel_AdminId",
                table: "AirlineCompany",
                column: "AdminId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

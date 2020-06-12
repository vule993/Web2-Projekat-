using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AvioAdminCarAdminFieldAdminAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "CarCompanies",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "AirlineCompany",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarCompanies_AdminId",
                table: "CarCompanies",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineCompany_AdminId",
                table: "AirlineCompany",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineCompany_UserModel_AdminId",
                table: "AirlineCompany",
                column: "AdminId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarCompanies_UserModel_AdminId",
                table: "CarCompanies",
                column: "AdminId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineCompany_UserModel_AdminId",
                table: "AirlineCompany");

            migrationBuilder.DropForeignKey(
                name: "FK_CarCompanies_UserModel_AdminId",
                table: "CarCompanies");

            migrationBuilder.DropIndex(
                name: "IX_CarCompanies_AdminId",
                table: "CarCompanies");

            migrationBuilder.DropIndex(
                name: "IX_AirlineCompany_AdminId",
                table: "AirlineCompany");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "CarCompanies");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "AirlineCompany");
        }
    }
}

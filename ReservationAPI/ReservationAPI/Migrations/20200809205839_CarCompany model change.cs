using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class CarCompanymodelchange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarCompanies_UserModel_AdminId",
                table: "CarCompanies");

            migrationBuilder.DropIndex(
                name: "IX_CarCompanies_AdminId",
                table: "CarCompanies");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "CarCompanies");

            migrationBuilder.AddColumn<string>(
                name: "Admin",
                table: "CarCompanies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admin",
                table: "CarCompanies");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "CarCompanies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CarCompanies_AdminId",
                table: "CarCompanies",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_CarCompanies_UserModel_AdminId",
                table: "CarCompanies",
                column: "AdminId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

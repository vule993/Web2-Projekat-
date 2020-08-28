using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class added_ratings_carCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Ratings_CarCompanyId",
                table: "Ratings",
                column: "CarCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_CarCompanies_CarCompanyId",
                table: "Ratings",
                column: "CarCompanyId",
                principalTable: "CarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_CarCompanies_CarCompanyId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_CarCompanyId",
                table: "Ratings");
        }
    }
}

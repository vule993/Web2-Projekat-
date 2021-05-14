using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class FriendsEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friend_AspNetUsers_UserId",
                table: "Friend");

            migrationBuilder.DropIndex(
                name: "IX_Friend_UserId",
                table: "Friend");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Friend");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Friend");

            migrationBuilder.AddColumn<string>(
                name: "User1Email",
                table: "Friend",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "User2Email",
                table: "Friend",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "User1Email",
                table: "Friend");

            migrationBuilder.DropColumn(
                name: "User2Email",
                table: "Friend");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Friend",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Friend",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Friend_UserId",
                table: "Friend",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_AspNetUsers_UserId",
                table: "Friend",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

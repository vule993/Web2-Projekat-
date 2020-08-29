using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class ChangePassengerTypeToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReservation_UserModel_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_UserModel_UserModelId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Seat_UserModel_PassengerId",
                table: "Seat");

            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropIndex(
                name: "IX_Seat_PassengerId",
                table: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_UserModelId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "Reservation");

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

            migrationBuilder.AddColumn<int>(
                name: "PassengerId",
                table: "Seat",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserModelId",
                table: "Reservation",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PassengerId",
                table: "AirlineReservation",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PassportNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserModel_UserModel_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "UserModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seat_PassengerId",
                table: "Seat",
                column: "PassengerId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_UserModelId",
                table: "Reservation",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId");

            migrationBuilder.CreateIndex(
                name: "IX_UserModel_UserModelId",
                table: "UserModel",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReservation_UserModel_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_UserModel_UserModelId",
                table: "Reservation",
                column: "UserModelId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Seat_UserModel_PassengerId",
                table: "Seat",
                column: "PassengerId",
                principalTable: "UserModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

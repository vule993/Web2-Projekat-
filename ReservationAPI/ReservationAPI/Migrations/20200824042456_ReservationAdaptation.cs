using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class ReservationAdaptation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passenger_UserModel_UserId",
                table: "Passenger");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_UserModel_UserModelId",
                table: "Reservation");

            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_UserModelId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Passenger_UserId",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "SeatReservationConfirmed",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "Taken",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "UserModelId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Passenger");

            migrationBuilder.AddColumn<bool>(
                name: "ForFastReservation",
                table: "Seat",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SeatStatus",
                table: "Seat",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RowNo",
                table: "Row",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Passenger",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Passenger",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passport_number",
                table: "Passenger",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Passenger",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeadlineForCanceling",
                table: "AirlineReservation",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PassengerId",
                table: "AirlineReservation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RowNumber",
                table: "AirlineReservation",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeatNumber",
                table: "AirlineReservation",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReservation_Passenger_PassengerId",
                table: "AirlineReservation",
                column: "PassengerId",
                principalTable: "Passenger",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReservation_Passenger_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropIndex(
                name: "IX_AirlineReservation_PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "ForFastReservation",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "SeatStatus",
                table: "Seat");

            migrationBuilder.DropColumn(
                name: "RowNo",
                table: "Row");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "Passport_number",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Passenger");

            migrationBuilder.DropColumn(
                name: "DeadlineForCanceling",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "PassengerId",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "RowNumber",
                table: "AirlineReservation");

            migrationBuilder.DropColumn(
                name: "SeatNumber",
                table: "AirlineReservation");

            migrationBuilder.AddColumn<bool>(
                name: "SeatReservationConfirmed",
                table: "Seat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Taken",
                table: "Seat",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UserModelId",
                table: "Reservation",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Passenger",
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
                name: "IX_Reservation_UserModelId",
                table: "Reservation",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Passenger_UserId",
                table: "Passenger",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserModel_UserModelId",
                table: "UserModel",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Passenger_UserModel_UserId",
                table: "Passenger",
                column: "UserId",
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
        }
    }
}

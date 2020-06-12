using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class AvioAdminPlusShared : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Country = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarReservation",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarReservation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    UserModelId = table.Column<int>(nullable: true)
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

            migrationBuilder.CreateTable(
                name: "AirlineCompany",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    AddressId = table.Column<long>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    likes = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineCompany", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AirlineCompany_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Passenger",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: true),
                    ApprovedAirlineSeat = table.Column<bool>(nullable: false),
                    ApprovedCarSeat = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passenger", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Passenger_UserModel_UserId",
                        column: x => x.UserId,
                        principalTable: "UserModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SeatConfiguration",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    SegmentsHeight = table.Column<short>(nullable: false),
                    segmentsNumber = table.Column<short>(nullable: false),
                    segmentOneWidth = table.Column<short>(nullable: false),
                    segmentTwoWidth = table.Column<short>(nullable: false),
                    segmentThreeWidth = table.Column<short>(nullable: false),
                    segmentFourWidth = table.Column<short>(nullable: false),
                    AirlineCompanyId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeatConfiguration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SeatConfiguration_AirlineCompany_AirlineCompanyId",
                        column: x => x.AirlineCompanyId,
                        principalTable: "AirlineCompany",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Row",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeatConfigurationId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Row", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Row_SeatConfiguration_SeatConfigurationId",
                        column: x => x.SeatConfigurationId,
                        principalTable: "SeatConfiguration",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Seat",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Taken = table.Column<bool>(nullable: false),
                    PassengerId = table.Column<long>(nullable: true),
                    SeatReservationConfirmed = table.Column<bool>(nullable: false),
                    SeatNo = table.Column<int>(nullable: false),
                    RowId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seat_Passenger_PassengerId",
                        column: x => x.PassengerId,
                        principalTable: "Passenger",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Seat_Row_RowId",
                        column: x => x.RowId,
                        principalTable: "Row",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Destination",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirportName = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    AirlineCompanyId = table.Column<long>(nullable: true),
                    FlightId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destination", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Destination_AirlineCompany_AirlineCompanyId",
                        column: x => x.AirlineCompanyId,
                        principalTable: "AirlineCompany",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Flight",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvioCompanyId = table.Column<long>(nullable: true),
                    StartingDestinationId = table.Column<long>(nullable: true),
                    EndingDestinationId = table.Column<long>(nullable: true),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    StartTime = table.Column<string>(nullable: true),
                    EndTime = table.Column<string>(nullable: true),
                    EstimationTime = table.Column<string>(nullable: true),
                    Discount = table.Column<short>(nullable: false),
                    PlaneTypeId = table.Column<long>(nullable: true),
                    OtherServices = table.Column<string>(nullable: true),
                    Price = table.Column<string>(nullable: true),
                    luggage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Flight_AirlineCompany_AvioCompanyId",
                        column: x => x.AvioCompanyId,
                        principalTable: "AirlineCompany",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flight_Destination_EndingDestinationId",
                        column: x => x.EndingDestinationId,
                        principalTable: "Destination",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flight_SeatConfiguration_PlaneTypeId",
                        column: x => x.PlaneTypeId,
                        principalTable: "SeatConfiguration",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Flight_Destination_StartingDestinationId",
                        column: x => x.StartingDestinationId,
                        principalTable: "Destination",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AirlineReservation",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlightId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirlineReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AirlineReservation_Flight_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flight",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirlineReservationId = table.Column<long>(nullable: true),
                    CarReservationId = table.Column<long>(nullable: true),
                    Taken = table.Column<bool>(nullable: false),
                    IsFinished = table.Column<bool>(nullable: false),
                    AirlineCompanyId = table.Column<long>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    UserModelId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservation_AirlineCompany_AirlineCompanyId",
                        column: x => x.AirlineCompanyId,
                        principalTable: "AirlineCompany",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_AirlineReservation_AirlineReservationId",
                        column: x => x.AirlineReservationId,
                        principalTable: "AirlineReservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_CarReservation_CarReservationId",
                        column: x => x.CarReservationId,
                        principalTable: "CarReservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservation_UserModel_UserModelId",
                        column: x => x.UserModelId,
                        principalTable: "UserModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AirlineCompany_AddressId",
                table: "AirlineCompany",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_AirlineReservation_FlightId",
                table: "AirlineReservation",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Destination_AirlineCompanyId",
                table: "Destination",
                column: "AirlineCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Destination_FlightId",
                table: "Destination",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_AvioCompanyId",
                table: "Flight",
                column: "AvioCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_EndingDestinationId",
                table: "Flight",
                column: "EndingDestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_PlaneTypeId",
                table: "Flight",
                column: "PlaneTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Flight_StartingDestinationId",
                table: "Flight",
                column: "StartingDestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Passenger_UserId",
                table: "Passenger",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_AirlineCompanyId",
                table: "Reservation",
                column: "AirlineCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_AirlineReservationId",
                table: "Reservation",
                column: "AirlineReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_CarReservationId",
                table: "Reservation",
                column: "CarReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_UserId",
                table: "Reservation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_UserModelId",
                table: "Reservation",
                column: "UserModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Row_SeatConfigurationId",
                table: "Row",
                column: "SeatConfigurationId");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_PassengerId",
                table: "Seat",
                column: "PassengerId");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_RowId",
                table: "Seat",
                column: "RowId");

            migrationBuilder.CreateIndex(
                name: "IX_SeatConfiguration_AirlineCompanyId",
                table: "SeatConfiguration",
                column: "AirlineCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserModel_UserModelId",
                table: "UserModel",
                column: "UserModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destination_Flight_FlightId",
                table: "Destination",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineCompany_Address_AddressId",
                table: "AirlineCompany");

            migrationBuilder.DropForeignKey(
                name: "FK_Destination_Flight_FlightId",
                table: "Destination");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropTable(
                name: "AirlineReservation");

            migrationBuilder.DropTable(
                name: "CarReservation");

            migrationBuilder.DropTable(
                name: "Passenger");

            migrationBuilder.DropTable(
                name: "Row");

            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Flight");

            migrationBuilder.DropTable(
                name: "Destination");

            migrationBuilder.DropTable(
                name: "SeatConfiguration");

            migrationBuilder.DropTable(
                name: "AirlineCompany");
        }
    }
}

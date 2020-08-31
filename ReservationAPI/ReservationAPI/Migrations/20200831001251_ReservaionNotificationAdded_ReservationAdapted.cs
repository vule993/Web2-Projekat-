using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class ReservaionNotificationAdded_ReservationAdapted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Taken",
                table: "Reservation");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Reservation",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReservationNotification",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserEmailFrom = table.Column<string>(nullable: true),
                    UserEmailTo = table.Column<string>(nullable: true),
                    ReservationId = table.Column<long>(nullable: false),
                    Message = table.Column<string>(nullable: true),
                    Status = table.Column<short>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationNotification", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationNotification");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Reservation");

            migrationBuilder.AddColumn<bool>(
                name: "Taken",
                table: "Reservation",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

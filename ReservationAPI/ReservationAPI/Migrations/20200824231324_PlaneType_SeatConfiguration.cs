using Microsoft.EntityFrameworkCore.Migrations;

namespace ReservationAPI.Migrations
{
    public partial class PlaneType_SeatConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "SegmentsHeight",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "segmentFourWidth",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "segmentOneWidth",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "segmentThreeWidth",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "segmentTwoWidth",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "segmentsNumber",
                table: "SeatConfiguration");

            migrationBuilder.AddColumn<long>(
                name: "PlaneTypeId",
                table: "SeatConfiguration",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PlaneType",
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
                    segmentFourWidth = table.Column<short>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaneType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeatConfiguration_PlaneTypeId",
                table: "SeatConfiguration",
                column: "PlaneTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_SeatConfiguration_PlaneType_PlaneTypeId",
                table: "SeatConfiguration",
                column: "PlaneTypeId",
                principalTable: "PlaneType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeatConfiguration_PlaneType_PlaneTypeId",
                table: "SeatConfiguration");

            migrationBuilder.DropTable(
                name: "PlaneType");

            migrationBuilder.DropIndex(
                name: "IX_SeatConfiguration_PlaneTypeId",
                table: "SeatConfiguration");

            migrationBuilder.DropColumn(
                name: "PlaneTypeId",
                table: "SeatConfiguration");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SeatConfiguration",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "SegmentsHeight",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "segmentFourWidth",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "segmentOneWidth",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "segmentThreeWidth",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "segmentTwoWidth",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);

            migrationBuilder.AddColumn<short>(
                name: "segmentsNumber",
                table: "SeatConfiguration",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }
    }
}

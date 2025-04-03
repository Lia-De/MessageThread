using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessageThread.Migrations
{
    /// <inheritdoc />
    public partial class InitCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MessageTrees",
                columns: table => new
                {
                    TreeId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageTrees", x => x.TreeId);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Note = table.Column<string>(type: "TEXT", nullable: false),
                    Datestamp = table.Column<long>(type: "INTEGER", nullable: false),
                    Author = table.Column<string>(type: "TEXT", nullable: false),
                    MessageTreeTreeId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MessageId);
                    table.ForeignKey(
                        name: "FK_Messages_MessageTrees_MessageTreeTreeId",
                        column: x => x.MessageTreeTreeId,
                        principalTable: "MessageTrees",
                        principalColumn: "TreeId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_MessageTreeTreeId",
                table: "Messages",
                column: "MessageTreeTreeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "MessageTrees");
        }
    }
}

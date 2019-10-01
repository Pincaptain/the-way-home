using Microsoft.EntityFrameworkCore;

namespace TheWayHome.Models.Contexts
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options) { }

        public DbSet<Game> Games { get; set; }
    }
}

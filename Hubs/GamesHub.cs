using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

using TheWayHome.Models;
using TheWayHome.Models.Contexts;
using TheWayHome.Extensions;

namespace TheWayHome.Hubs
{
    public class GamesHub : Hub
    {
        private readonly GameContext _context;

        public GamesHub(GameContext context)
        {
            _context = context;
        }

        public async Task JoinGame(string identity, long gameId)
        {
            var player = new Player()
            {
                Identity = identity,
                Name = NameGenerator.GenerateName()
            };

            var game = await _context.Games.FindAsync(gameId);

            game.Players.Add(player);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("PLAYER_JOINED", player.Name);
        }

        public async Task LeaveGame(string identity, long gameId)
        {
            var game = await _context.Games.FindAsync(gameId);
            var player = await _context.Games
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);

            game.Players.Remove(player);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("PLAYER_LEFT", player.Name);
        }
    }
}

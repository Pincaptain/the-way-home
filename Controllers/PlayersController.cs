using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TheWayHome.Models;
using TheWayHome.Models.Contexts;

namespace TheWayHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly GameContext _context;

        public PlayersController(GameContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _context.Games
                .SelectMany(g => g.Players)
                .Distinct()
                .ToListAsync();
        }

        [HttpGet("{identity}")]
        public async Task<ActionResult<Player>> GetPlayer(string identity)
        {
            var player = await _context.Games
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpGet("Game/{gameId}")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayersFromGame(long gameId)
        {
            var players = await _context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .ToListAsync();

            if (players == null)
            {
                return NotFound();
            }

            return players;
        }

        [HttpGet("Game/{gameId}/{identity}")]
        public async Task<ActionResult<Player>> GetPlayerFromGame(long gameId, string identity)
        {
            var player = await _context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }
    }
}
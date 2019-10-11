using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using TheWayHome.Models;
using TheWayHome.Services;

namespace TheWayHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayersService PlayersService;

        public PlayersController(IPlayersService playersService) => PlayersService = playersService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await PlayersService.GetPlayers();
        }

        [HttpGet("{identity}")]
        public async Task<ActionResult<Player>> GetPlayer(string identity)
        {
            var player = await PlayersService.GetPlayer(p => p.Identity == identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpGet("Game/{gameId}")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayersByGame(long gameId)
        {
            return await PlayersService.GetPlayersByGame(gameId);
        }

        [HttpGet("Game/{gameId}/{identity}")]
        public async Task<ActionResult<Player>> GetPlayerByGame(long gameId, string identity)
        {
            var player = await PlayersService.GetPlayerByGame(gameId, identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }
    }
}
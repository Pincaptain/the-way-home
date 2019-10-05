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
        private readonly IPlayersService _playersService;

        public PlayersController(IPlayersService playersService)
        {
            _playersService = playersService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _playersService.FindAll();
        }

        [HttpGet("{identity}")]
        public async Task<ActionResult<Player>> GetPlayer(string identity)
        {
            var player = await _playersService.FindOne(p => p.Identity == identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpGet("Game/{gameId}")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayersByGame(long gameId)
        {
            return await _playersService.FindAllByGame(gameId);
        }

        [HttpGet("Game/{gameId}/{identity}")]
        public async Task<ActionResult<Player>> GetPlayerByGame(long gameId, string identity)
        {
            var player = await _playersService.FindOneByGame(gameId, identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }
    }
}
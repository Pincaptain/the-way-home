using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using TheWayHome.Models;
using TheWayHome.Repositories;

namespace TheWayHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayersRepository _playersRepository;

        public PlayersController(IPlayersRepository playersRepository)
        {
            _playersRepository = playersRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _playersRepository.FindAll();
        }

        [HttpGet("{identity}")]
        public async Task<ActionResult<Player>> GetPlayer(string identity)
        {
            var player = await _playersRepository.FindOne(p => p.Identity == identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpGet("Game/{gameId}")]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayersByGame(long gameId)
        {
            return await _playersRepository.FindAllByGame(gameId);
        }

        [HttpGet("Game/{gameId}/{identity}")]
        public async Task<ActionResult<Player>> GetPlayerByGame(long gameId, string identity)
        {
            var player = await _playersRepository.FindOneByGame(gameId, identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using TheWayHome.Models;
using TheWayHome.Services;

namespace TheWayHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGamesService _gamesService;

        public GamesController(IGamesService gamesService)
        {
            _gamesService = gamesService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _gamesService.FindAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(long id)
        {
            var game = await _gamesService.FindOne(g => g.Id == id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game game)
        {
            await _gamesService.Create(game);

            return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            await _gamesService.Update(game);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Game>>> DeleteGame(long id)
        {
            var game = await _gamesService.FindOne(g => g.Id == id);

            if (game == null)
            {
                return NotFound();
            }

            await _gamesService.Delete(game);

            return NoContent();
        }
    }
}
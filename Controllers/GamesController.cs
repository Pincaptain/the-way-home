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
        private readonly IGamesService GamesService;

        public GamesController(IGamesService gamesService) => GamesService = gamesService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var parameters = HttpContext.Request.Query;

            return await GamesService.GetGames(parameters);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(long id)
        {
            var game = await GamesService.GetGame(g => g.Id == id);

            if (game == null)
            {
                return NotFound();
            }
            
            return game;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game game)
        {
            await GamesService.CreateGame(game);

            return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(long id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            await GamesService.UpdateGame(game);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Game>>> DeleteGame(long id)
        {
            var game = await GamesService.GetGame(g => g.Id == id);

            if (game == null)
            {
                return NotFound();
            }

            await GamesService.DeleteGame(game);

            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using TheWayHome.Models;
using TheWayHome.Models.Contexts;

namespace TheWayHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly GameContext _context;

        public GamesController(GameContext context)
        {
            _context = context;

            if (_context.Games.Count() == 0)
            {
                var gameOne = new Game()
                {
                    Name = "World of Warcraft Vanilla"
                };
                var gameTwo = new Game()
                {
                    Name = "World of Warcraft Legion"
                };

                _context.Games.Add(gameOne);
                _context.Games.Add(gameTwo);
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(long id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchGame(long id, JsonPatchDocument<Game> jsonPatchGame)
        {
            try
            {
                var game = await _context.Games.FindAsync(id);

                if (game == null)
                {
                    return NotFound();
                }

                jsonPatchGame.ApplyTo(game);

                _context.Games.Update(game);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch { }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(long id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
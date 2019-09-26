using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
            return await _context.Players.ToListAsync();
        }

        [HttpGet("{identity}")]
        public async Task<ActionResult<Player>> GetPlayer(string identity)
        {
            var player = await _context.Players.FindAsync(identity);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }
    }
}
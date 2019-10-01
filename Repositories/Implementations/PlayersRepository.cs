using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheWayHome.Models;

using TheWayHome.Models.Contexts;
using TheWayHome.Extensions;

namespace TheWayHome.Repositories.Implementations
{
    public class PlayersRepository : IPlayersRepository
    {
        private readonly GameContext _context;

        public PlayersRepository(GameContext context)
        {
            _context = context;
        }

        public Task<List<Player>> FindAll()
        {
            return _context.Games
                .SelectMany(g => g.Players)
                .ToListAsync();
        }

        public Task<List<Player>> FindByCondition(Expression<Func<Player, bool>> condition)
        {
            return _context.Games
                .SelectMany(g => g.Players)
                .Where(condition)
                .ToListAsync();
        }

        public Task<Player> FindOne(Expression<Func<Player, bool>> condition)
        {
            return _context.Games
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(condition);
        }

        public Task<List<Player>> FindAllByGame(long gameId)
        {
            return _context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .ToListAsync();
        }

        public Task<Player> FindOneByGame(long gameId, string identity)
        {
            return _context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);
        }

        public async Task<Player> Create(long gameId, string identity)
        {
            var player = new Player()
            {
                Identity = identity,
                Name = NameGenerator.GenerateName()
            };

            var game = await _context.Games.FindAsync(gameId);

            game.Players.Add(player);
            await _context.SaveChangesAsync();

            return player;
        }

        public async Task<Player> Delete(long gameId, string identity)
        {
            var game = await _context.Games.FindAsync(gameId);
            var player = await _context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);

            game.Players.Remove(player);
            await _context.SaveChangesAsync();

            return player;
        }
    }
}

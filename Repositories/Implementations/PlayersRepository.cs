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
        private readonly GameContext Context;

        public PlayersRepository(GameContext context) => Context = context;

        public Task<List<Player>> FindAll()
        {
            return Context.Games
                .SelectMany(g => g.Players)
                .ToListAsync();
        }

        public Task<List<Player>> FindByCondition(Expression<Func<Player, bool>> condition)
        {
            return Context.Games
                .SelectMany(g => g.Players)
                .Where(condition)
                .ToListAsync();
        }

        public Task<List<Player>> FindByGame(long gameId)
        {
            return Context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .ToListAsync();
        }

        public Task<Player> FindOne(Expression<Func<Player, bool>> condition)
        {
            return Context.Games
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(condition);
        }

        public Task<Player> FindOneByGame(long gameId, string identity)
        {
            return Context.Games
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

            var game = await Context.Games.FindAsync(gameId);

            game.Players.Add(player);
            await SaveChanges();

            return player;
        }

        public async Task<Player> Delete(long gameId, string identity)
        {
            var game = await Context.Games.FindAsync(gameId);
            var player = await Context.Games
                .Where(g => g.Id == gameId)
                .SelectMany(g => g.Players)
                .FirstOrDefaultAsync(p => p.Identity == identity);

            game.Players.Remove(player);
            await SaveChanges();

            return player;
        }

        public Task<int> SaveChanges() => Context.SaveChangesAsync();
    }
}

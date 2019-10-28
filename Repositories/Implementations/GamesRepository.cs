using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;
using TheWayHome.Models.Contexts;

namespace TheWayHome.Repositories.Implementations
{
    public class GamesRepository : IGamesRepository
    {
        private readonly GameContext Context;

        public GamesRepository(GameContext context)
        {
            Context = context;

            if (Context.Games.Count() == 0)
            {
                var gameOne = new Game()
                {
                    Name = "Nogglerfoggler",
                    Description = "He smiled to himself, enjoying the game they always played"
                };
                var gameTwo = new Game()
                {
                    Name = "Dawnbringer",
                    Description = "It's a game, like a treasure hunt"
                };
                var gameThree = new Game()
                {
                    Name = "Game of Chairs",
                    Description = "When we first played this game two or three days ago, she showed no ingenuity at all in finding the object"
                };

                Context.Games.Add(gameOne);
                Context.Games.Add(gameTwo);
                Context.Games.Add(gameThree);
                Context.SaveChanges();
            }
        }

        public Task<List<Game>> FindAll()
        {
            return Context.Games.Include(g => g.Players).ToListAsync();
        }

        public Task<List<Game>> FindByCondition(Expression<Func<Game, bool>> condition)
        {
            return Context.Games
                .Where(condition)
                .Include(g => g.Players)
                .ToListAsync();
        }

        public Task<List<Game>> FindByOffset(Expression<Func<Game, bool>> condition, int offset, int take)
        {
            return Context.Games
                .Where(condition)
                .Skip(offset)
                .Take(take)
                .Include(g => g.Players)
                .ToListAsync();
        }

        public Task<Game> FindOne(Expression<Func<Game, bool>> condition)
        {
            return Context.Games
                .Include(g => g.Players)
                .FirstOrDefaultAsync(condition);
        }

        public async Task<Game> Create(Game game)
        {
            Context.Games.Add(game);
            await SaveChanges();

            return game;
        }

        public async Task<bool> Update(Game game)
        {
            Context.Entry(game).State = EntityState.Modified;
            await SaveChanges();

            return true;
        }

        public async Task<bool> Delete(Game game)
        {
            Context.Games.Remove(game);
            await SaveChanges();

            return true;
        }

        public Task<int> SaveChanges()
        {
            return Context.SaveChangesAsync();
        }
    }
}

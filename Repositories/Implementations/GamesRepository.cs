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
                    Name = "Nogglerfoggler"
                };
                var gameTwo = new Game()
                {
                    Name = "Dawnbringer"
                };
                var gameThree = new Game()
                {
                    Name = "Game of Chairs"
                };

                Context.Games.Add(gameOne);
                Context.Games.Add(gameTwo);
                Context.Games.Add(gameThree);
                Context.SaveChanges();
            }
        }

        public Task<List<Game>> FindAll()
        {
            return Context.Games.ToListAsync();
        }

        public Task<List<Game>> FindByCondition(Expression<Func<Game, bool>> condition)
        {
            return Context.Games
                .Where(condition)
                .ToListAsync();
        }

        public Task<List<Game>> FindByOffset(Expression<Func<Game, bool>> condition, int offset, int take)
        {
            return Context.Games
                .Where(condition)
                .Skip(offset)
                .Take(take)
                .ToListAsync();
        }

        public Task<Game> FindOne(Expression<Func<Game, bool>> condition)
        {
            return Context.Games.FirstOrDefaultAsync(condition);
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

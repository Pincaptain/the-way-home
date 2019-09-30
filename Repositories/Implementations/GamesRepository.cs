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
        private readonly GameContext _context;

        public GamesRepository(GameContext context)
        {
            _context = context;

            if (_context.Games.Count() == 0)
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

                _context.Games.Add(gameOne);
                _context.Games.Add(gameTwo);
                _context.Games.Add(gameThree);
                _context.SaveChanges();
            }
        }

        public Task<List<Game>> FindAll()
        {
            return _context.Games.ToListAsync();
        }

        public Task<List<Game>> FindByCondition(Expression<Func<Game, bool>> condition)
        {
            return _context.Games
                .Where(condition)
                .ToListAsync();
        }

        public Task<Game> FindOne(Expression<Func<Game, bool>> condition)
        {
            return _context.Games.FirstOrDefaultAsync(condition);
        }

        public async Task<Game> Create(Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return game;
        }

        public async Task<bool> Update(Game game)
        {
            _context.Entry(game).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(Game game)
        {
            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

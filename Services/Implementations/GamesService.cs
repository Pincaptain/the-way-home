using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheWayHome.Models;
using TheWayHome.Repositories;

namespace TheWayHome.Services.Implementations
{
    public class GamesService : IGamesService
    {
        private readonly IGamesRepository GamesRepository;

        public GamesService(IGamesRepository gamesRepository)
        {
            GamesRepository = gamesRepository;
        }

        public Task<List<Game>> GetGames()
        {
            return GamesRepository.FindAll();
        }

        public Task<Game> GetGame(Expression<Func<Game, bool>> condition)
        {
            return GamesRepository.FindOne(condition);
        }

        public Task<Game> CreateGame(Game game)
        {
            return GamesRepository.Create(game);
        }

        public Task<bool> UpdateGame(Game game)
        {
            return GamesRepository.Update(game);
        }

        public Task<bool> DeleteGame(Game game)
        {
            return GamesRepository.Delete(game);
        }
    }
}

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
        private readonly IGamesRepository _gamesRepository;

        public GamesService(IGamesRepository gamesRepository)
        {
            _gamesRepository = gamesRepository;
        }

        public Task<List<Game>> FindAll()
        {
            return _gamesRepository.FindAll();
        }

        public Task<List<Game>> FindByCondition(Expression<Func<Game, bool>> condition)
        {
            return _gamesRepository.FindByCondition(condition);
        }

        public Task<Game> FindOne(Expression<Func<Game, bool>> condition)
        {
            return _gamesRepository.FindOne(condition);
        }

        public Task<Game> Create(Game game)
        {
            return _gamesRepository.Create(game);
        }

        public Task<bool> Update(Game game)
        {
            return _gamesRepository.Update(game);
        }

        public Task<bool> Delete(Game game)
        {
            return _gamesRepository.Delete(game);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Repositories;
using TheWayHome.Models;

namespace TheWayHome.Services.Implementations
{
    public class PlayersService : IPlayersService
    {
        private readonly IPlayersRepository _playersRepository;

        public PlayersService(IPlayersRepository playersRepository)
        {
            _playersRepository = playersRepository;
        }

        public Task<List<Player>> FindAll()
        {
            return _playersRepository.FindAll();
        }

        public Task<List<Player>> FindByCondition(Expression<Func<Player, bool>> condition)
        {
            return _playersRepository.FindByCondition(condition);
        }

        public Task<Player> FindOne(Expression<Func<Player, bool>> condition)
        {
            return _playersRepository.FindOne(condition);
        }

        public Task<List<Player>> FindAllByGame(long gameId)
        {
            return _playersRepository.FindAllByGame(gameId);
        }

        public Task<Player> FindOneByGame(long gameId, string identity)
        {
            return _playersRepository.FindOneByGame(gameId, identity);
        }

        public Task<Player> Create(long gameId, string identity)
        {
            return _playersRepository.Create(gameId, identity);
        }

        public Task<Player> Delete(long gameId, string identity)
        {
            return _playersRepository.Delete(gameId, identity);
        }
    }
}

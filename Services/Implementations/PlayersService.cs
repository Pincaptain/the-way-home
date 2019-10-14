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
        private readonly IPlayersRepository PlayersRepository;

        public PlayersService(IPlayersRepository playersRepository) => PlayersRepository = playersRepository;

        public Task<List<Player>> GetPlayers()
        {
            return PlayersRepository.FindAll();
        }

        public Task<List<Player>> GetPlayersByGame(long gameId)
        {
            return PlayersRepository.FindByGame(gameId);
        }

        public Task<Player> GetPlayer(Expression<Func<Player, bool>> condition)
        {
            return PlayersRepository.FindOne(condition);
        }

        public Task<Player> GetPlayerByGame(long gameId, string identity)
        {
            return PlayersRepository.FindOneByGame(gameId, identity);
        }

        public Task<Player> CreatePlayer(long gameId, string identity)
        {
            return PlayersRepository.Create(gameId, identity);
        }

        public Task<Player> DeletePlayer(long gameId, string identity)
        {
            return PlayersRepository.Delete(gameId, identity);
        }
    }
}

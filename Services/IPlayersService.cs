using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Services
{
    public interface IPlayersService
    {
        Task<List<Player>> GetPlayers();

        Task<List<Player>> GetPlayersByGame(long gameId);

        Task<Player> GetPlayer(Expression<Func<Player, bool>> condition);

        Task<Player> GetPlayerByGame(long gameId, string identity);

        Task<Player> CreatePlayer(long gameId, string identity);

        Task<Player> DeletePlayer(long gameId, string identity);
    }
}

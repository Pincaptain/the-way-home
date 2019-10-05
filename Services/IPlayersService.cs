using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Services
{
    public interface IPlayersService
    {
        Task<List<Player>> FindAll();

        Task<List<Player>> FindByCondition(Expression<Func<Player, bool>> condition);

        Task<Player> FindOne(Expression<Func<Player, bool>> condition);

        Task<List<Player>> FindAllByGame(long gameId);

        Task<Player> FindOneByGame(long gameId, string identity);

        Task<Player> Create(long gameId, string identity);

        Task<Player> Delete(long gameId, string identity);
    }
}

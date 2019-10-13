using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Services
{
    public interface IGamesService
    {
        Task<List<Game>> GetGames(IQueryCollection parameters = null);

        Task<Game> GetGame(Expression<Func<Game, bool>> condition);

        Task<Game> CreateGame(Game game);

        Task<bool> UpdateGame(Game game);

        Task<bool> DeleteGame(Game game);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Services
{
    public interface IGamesService
    {
        Task<List<Game>> FindAll();

        Task<List<Game>> FindByCondition(Expression<Func<Game, bool>> condition);

        Task<Game> FindOne(Expression<Func<Game, bool>> condition);

        Task<Game> Create(Game game);

        Task<bool> Update(Game game);

        Task<bool> Delete(Game game);
    }
}

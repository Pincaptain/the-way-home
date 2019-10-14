using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Repositories
{
    public interface IGamesRepository : ICrudRepository<Game>
    {
        Task<List<Game>> FindByOffset(Expression<Func<Game, bool>> condition, int offset, int take);
    }
}

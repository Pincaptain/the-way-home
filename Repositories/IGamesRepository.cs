using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Repositories
{
    public interface IGamesRepository : ICrudRepository<Game> { }
}

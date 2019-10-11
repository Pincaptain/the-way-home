using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheWayHome.Repositories
{
    public interface IRepository
    {
        Task<int> SaveChanges();
    }
}

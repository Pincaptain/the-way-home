using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Repositories
{
    public interface ICrudRepository<T>
    {
        Task<List<T>> FindAll();

        Task<List<T>> FindByCondition(Expression<Func<T, bool>> condition);

        Task<T> FindOne(Expression<Func<T, bool>> condition);

        Task<Game> Create(T entity);

        Task<bool> Update(T entity);

        Task<bool> Delete(T entity);
    }
}

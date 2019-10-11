using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TheWayHome.Repositories
{
    public interface ICrudRepository<T> : IRepository
    {
        Task<List<T>> FindAll();

        Task<List<T>> FindByCondition(Expression<Func<T, bool>> condition);

        Task<T> FindOne(Expression<Func<T, bool>> condition);

        Task<T> Create(T entity);

        Task<bool> Update(T entity);

        Task<bool> Delete(T entity);
    }
}

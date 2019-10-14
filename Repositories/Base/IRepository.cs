using System.Threading.Tasks;

namespace TheWayHome.Repositories
{
    public interface IRepository
    {
        Task<int> SaveChanges();
    }
}

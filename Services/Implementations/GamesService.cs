using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheWayHome.Models;
using TheWayHome.Repositories;

namespace TheWayHome.Services.Implementations
{
    public class GamesService : IGamesService
    {
        private readonly IGamesRepository GamesRepository;

        public GamesService(IGamesRepository gamesRepository)
        {
            GamesRepository = gamesRepository;
        }

        public Task<List<Game>> GetGames(IQueryCollection parameters = null)
        {
            if (parameters == null || parameters.Count == 0)
            {
                return GamesRepository.FindAll();
            }

            var search = "";
            var offset = 0;
            var take = 5;

            if (parameters.ContainsKey(nameof(search))) search = parameters[nameof(search)].ToString().ToLower();
            if (parameters.ContainsKey(nameof(offset))) int.TryParse(parameters[nameof(offset)], out offset);
            if (parameters.ContainsKey(nameof(take))) int.TryParse(parameters[nameof(take)], out take);

            Expression<Func<Game, bool>> condition = 
                g => g.Name.ToLower().Contains(search);

            return GamesRepository.FindByOffset(condition, offset, take);
        }

        public Task<Game> GetGame(Expression<Func<Game, bool>> condition)
        {
            return GamesRepository.FindOne(condition);
        }

        public Task<Game> CreateGame(Game game)
        {
            return GamesRepository.Create(game);
        }

        public Task<bool> UpdateGame(Game game)
        {
            return GamesRepository.Update(game);
        }

        public Task<bool> DeleteGame(Game game)
        {
            return GamesRepository.Delete(game);
        }
    }
}

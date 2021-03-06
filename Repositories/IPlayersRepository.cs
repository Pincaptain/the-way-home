﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using TheWayHome.Models;

namespace TheWayHome.Repositories
{
    public interface IPlayersRepository : IRepository
    {
        Task<List<Player>> FindAll();

        Task<List<Player>> FindByCondition(Expression<Func<Player, bool>> condition);

        Task<List<Player>> FindByGame(long gameId);

        Task<Player> FindOne(Expression<Func<Player, bool>> condition);

        Task<Player> FindOneByGame(long gameId, string identity);

        Task<Player> Create(long gameId, string identity);

        Task<Player> Delete(long gameId, string identity);
    }
}

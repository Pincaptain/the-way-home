using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using TheWayHome.Models;
using TheWayHome.Models.Contexts;

namespace TheWayHome.Hubs
{
    public class GamesHub : Hub
    {
        private readonly GameContext _context;

        public GamesHub(GameContext context)
        {
            _context = context;
        }

        public async Task JoinGame(string user)
        {
            await Clients.All.SendAsync("PLAYER_JOINED", user);
        }

        public async Task LeaveGame(string user)
        {
            await Clients.All.SendAsync("PLAYER_LEFT", user);
        }
    }
}

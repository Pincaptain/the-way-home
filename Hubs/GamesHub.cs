using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using TheWayHome.Services;

namespace TheWayHome.Hubs
{
    public class GamesHub : Hub
    {
        private readonly IPlayersService PlayersService;

        public GamesHub(IPlayersService playersService) => PlayersService = playersService;

        public async Task JoinGame(string identity, long gameId)
        {
            var player = await PlayersService.CreatePlayer(gameId, identity);

            await Clients.All.SendAsync("PLAYER_JOINED", player.Name);
        }

        public async Task LeaveGame(string identity, long gameId)
        {
            var player = await PlayersService.DeletePlayer(gameId, identity);

            await Clients.All.SendAsync("PLAYER_LEFT", player.Name);
        }
    }
}

using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using TheWayHome.Repositories;

namespace TheWayHome.Hubs
{
    public class GamesHub : Hub
    {
        private readonly IPlayersRepository _playersRepository;

        public GamesHub(IPlayersRepository playersRepository)
        {
            _playersRepository = playersRepository;
        }

        public async Task JoinGame(string identity, long gameId)
        {
            var player = await _playersRepository.Create(gameId, identity);

            await Clients.All.SendAsync("PLAYER_JOINED", player.Name);
        }

        public async Task LeaveGame(string identity, long gameId)
        {
            var player = await _playersRepository.Delete(gameId, identity);

            await Clients.All.SendAsync("PLAYER_LEFT", player.Name);
        }
    }
}

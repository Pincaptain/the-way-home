using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheWayHome.Models
{
    public class Game
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage ="Description is required")]
        public string Description { get; set; }

        public List<Player> Players { get; set; }

        public long PlayersCount { get => Players.Count; }

        public Game() => Players = new List<Player>();

        public override bool Equals(object obj)
        {
            if (obj == null || !GetType().Equals(obj.GetType()))
            {
                return false;
            }

            var game = (Game)obj;

            return Id.Equals(game.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, Description, Players);
        }
    }
}

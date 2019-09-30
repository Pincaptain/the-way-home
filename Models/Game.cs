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

        public List<Player> Players { get; set; }

        public Game()
        {
            Players = new List<Player>();
        }
    }
}

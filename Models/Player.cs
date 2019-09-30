using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TheWayHome.Models
{
    public class Player
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Identity is required")]
        public string Identity { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || !GetType().Equals(obj.GetType()))
            {
                return false;
            }

            var player = (Player) obj;

            return Identity.Equals(player.Identity);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Identity, Name);
        }
    }
}

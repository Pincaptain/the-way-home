using Microsoft.AspNetCore.Http;

namespace TheWayHome.Extensions
{
    public class FiltersBuilder
    {
        public static void GamesFiltersBuilder(IQueryCollection parameters, out string search, out int offset, out int take)
        {
            search = "";
            offset = 0;
            take = 5;

            if (parameters.ContainsKey(nameof(search))) search = parameters[nameof(search)].ToString().ToLower();
            if (parameters.ContainsKey(nameof(offset))) int.TryParse(parameters[nameof(offset)], out offset);
            if (parameters.ContainsKey(nameof(take))) int.TryParse(parameters[nameof(take)], out take);
        }
    }
}

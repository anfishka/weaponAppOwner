using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace weaponOwnerApi.Entities
{
    public class Admin
    {
        [Key]
        [SwaggerIgnore]
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public bool is_active { get; set; }
        [SwaggerIgnore]
        public int card_count { get; set; }
    }
}
using Microsoft.AspNetCore.Mvc;
using weaponOwnerApi.Data;
using weaponOwnerApi.Entities;

namespace weaponOwnerApi.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminsController(AppDbContext context)
        {
            _context = context;
        }

        // Получение администратора по ID
        [HttpGet("{id}")]
        public IActionResult GetAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.id == id);
            if (admin == null)
                return NotFound(new { message = "Admin was not found" });

            return Ok(admin);
        }

        // Редактирование логина, пароля и статуса администратора
        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, [FromBody] Admin updatedAdmin)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.id == id);
            if (admin == null)
                return NotFound(new { message = "Admin was not found" });

            // Обновляем данные
            admin.username = updatedAdmin.username;
            admin.password = updatedAdmin.password;
            admin.is_active = updatedAdmin.is_active;

            _context.SaveChanges();
            return Ok(new { message = "Updated successfully!" });
        }
    }
}

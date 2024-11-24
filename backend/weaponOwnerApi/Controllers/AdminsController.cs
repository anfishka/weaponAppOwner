using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // Настроить асинхрон
        [HttpGet()]
        public async Task<IActionResult> GetAdminsAll()
        {
            var admins = await _context.Admins.ToListAsync();
            return Ok(admins);
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

            var existingAdmin = _context.Admins.FirstOrDefault(a => a.username == updatedAdmin.username && a.id != id);
            if (existingAdmin != null)
            {
                return Conflict(new { message = "Username already exists." });
            }

            // Обновляем данные
            admin.username = updatedAdmin.username;
            admin.password = updatedAdmin.password;
            admin.is_active = updatedAdmin.is_active;

            _context.SaveChanges();
            return Ok(new { message = "Updated successfully!" });
        }
        [HttpPost]
        public IActionResult AddAdmin([FromBody] Admin newAdmin)
        {
            /*   if (!_context.SpaceObjTypes.Any(t => t.username != newSpaceObjectDto.idSpaceObjType))
               {
                   return BadRequest($"Type with ID {newSpaceObjectDto.idSpaceObjType} does not exist.");
               }
            //TODO проверка на ид и одинаковій логин!!!
            */
            if (_context.Admins.Any(a => a.username == newAdmin.username))
            {
                return BadRequest("Admin with this username was added earlier.");
            }


            var admin = new Admin
            {
                username = newAdmin.username,
                password = newAdmin.password,
                is_active = newAdmin.is_active,
                email = newAdmin.email,
                first_name = newAdmin.first_name,
               last_name = newAdmin.last_name
           
            };

            _context.Admins.Add(newAdmin);
            _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdmin), new { id = newAdmin.id }, newAdmin);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateAdminPartially(int id, [FromBody] JsonPatchDocument<Admin> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid patch document.");
            }

            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound($"Admin with ID {id} was not found.");
            }

            // Создаем временный объект, чтобы проверить уникальность логина
            var tempAdmin = new Admin
            {
                username = admin.username,
                password = admin.password,
                is_active = admin.is_active,
                email = admin.email,
                first_name = admin.first_name,
                last_name = admin.last_name
            };

            // Применяем изменения к временному объекту
            patchDoc.ApplyTo(tempAdmin, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Проверяем, существует ли уже другой администратор с таким же логином
            var existingAdmin = _context.Admins.FirstOrDefault(a => a.username == tempAdmin.username && a.id != id);
            if (existingAdmin != null)
            {
                return Conflict(new { message = "Username already exists." });
            }

            // Если уникальность логина подтверждена, применяем изменения к реальному объекту
            patchDoc.ApplyTo(admin, ModelState);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}

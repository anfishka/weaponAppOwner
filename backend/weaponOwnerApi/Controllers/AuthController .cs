using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using weaponOwnerApi.Data;
using weaponOwnerApi.Entities;

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}

[Route("api/[controller]")]
[ApiController]
public class AdminAuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminAuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Проверяем, указаны ли логин и пароль
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Логин и пароль обязательны.");
        }

        // Ищем администратора по имени пользователя
        var admin = await _context.Admins.SingleOrDefaultAsync(a => a.username == request.Username);

        if (admin == null)
        {
            return Unauthorized("Неверное имя пользователя или пароль.");
        }

        // Сравниваем пароли (в незашифрованном виде)
        if (admin.password != request.Password)
        {
            return Unauthorized("Неверное имя пользователя или пароль.");
        }

        // Проверяем, активен ли администратор
        if (!admin.is_active)
        {
            return Unauthorized("Администратор отключён.");
        }

        // Генерация JWT токена
        var token = GenerateJwtToken(admin);

        // Возвращаем токен и данные администратора
        return Ok(new
        {
            Token = token,
            Admin = new
            {
                admin.id,
                admin.username,
                admin.first_name,
                admin.last_name
            }
        });
    }


  private string GenerateJwtToken(Admin admin)
{
    var jwtSettings = new
    {
        Issuer = "https://localhost:7162/",
        Audience = "https://localhost:3000/",
        SecretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikhhbm5hIEFubiIsImlhdCI6MTUxNjIzOTAyMn0.bCSvzeNbFOF99NyANoMP32ZT03URVyEcRMNqFKkOHW0" // Ensure at least 16 characters
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, admin.username),
        new Claim("adminId", admin.id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var token = new JwtSecurityToken(
        issuer: jwtSettings.Issuer,
        audience: jwtSettings.Audience,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1),
        signingCredentials: creds);

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}
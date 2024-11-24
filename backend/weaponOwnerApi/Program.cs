using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using weaponOwnerApi.Data;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
/*
// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers()
      .AddNewtonsoftJson(options =>
      {
          options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
      }); ;

*/
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AzureSqlDb")));

// Проверка подключения
var connectionString = builder.Configuration.GetConnectionString("AzureSqlDb");
try
{
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        Console.WriteLine("Подключение к Azure SQL Server установлено успешно!");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Ошибка подключения: {ex.Message}");
}

// Настройка контроллеров и JSON
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3001", "http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
         .WithExposedHeaders("Content-Length");
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

// Define search endpoint for admins
app.MapGet("/admins/search", async (string? query, AppDbContext context) =>
{
    if (string.IsNullOrWhiteSpace(query))
    {
        return Results.BadRequest("Search query cannot be empty.");
    }

    // Поиск администраторов по всем заданным полям
    var admins = await context.Admins
        .Where(a =>
            EF.Functions.Like(a.id.ToString(), $"%{query}%") || // Частичное совпадение по ID
            EF.Functions.Like(a.first_name, $"%{query}%") ||   // Частичное совпадение по имени
            EF.Functions.Like(a.last_name, $"%{query}%") ||    // Частичное совпадение по фамилии
            EF.Functions.Like(a.username, $"%{query}%") ||    // Частичное совпадение по логину
            EF.Functions.Like(a.email, $"%{query}%"))         // Частичное совпадение по email
        .Select(a => new
        {
            a.id,
            a.first_name,
            a.last_name,
            a.username,
            a.email,
            a.is_active,
            a.card_count
        })
        .ToListAsync();

    if (!admins.Any())
    {
        return Results.NotFound("No matching admins found.");
    }

    return Results.Ok(admins);
})
.WithName("SearchAdmins");


app.Run();



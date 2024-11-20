using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using weaponOwnerApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers()
      .AddNewtonsoftJson(options =>
      {
          options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
      }); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Define search endpoint for admins
app.MapGet("/admins/search", (string? query, AppDbContext context) =>
{
    // Поиск администраторов по ID, имени или фамилии
    var admins = context.Admins
        .Where(a =>
            string.IsNullOrEmpty(query) ||
            a.id.ToString().Contains(query) ||
            a.first_name.Contains(query) ||
            a.last_name.Contains(query))
        .Select(a => new
        {
            a.id,
            a.first_name,
            a.last_name,
            a.username,
            a.is_active,
            a.card_count
        })
        .ToList();

    return Results.Ok(admins);
})
.WithName("SearchAdmins");

app.Run();

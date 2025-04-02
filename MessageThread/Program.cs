using MessageThread.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
string connectionString = Environment.GetEnvironmentVariable("SQLite_SRC");
if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Check .env");
}

// Add services to the container.
builder.Services.AddDbContext<MessageContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddControllers();

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

app.Run();

using MessageThread.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;
using MessageThread.Hubs;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
string connectionString = Environment.GetEnvironmentVariable("SQLite_SRC");
if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("Check .env");
}

// Adding Signal R 
builder.Services.AddSignalR();

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

// Addding SignalR
app.MapHub<NotifyHub>("/notifyHub");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

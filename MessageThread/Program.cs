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

builder.Services.AddCors(options => { 
    options.AddPolicy(name: "signalr", policy => { 
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .WithMethods("GET", "POST")
        .AllowCredentials(); 
    }); 
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ................................
// Configure the HTTP request pipeline. Maybe needed for SignalR??
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production
    // scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
// ................................

// Addding SignalR
app.MapHub<NotifyHub>("/notifyHub");
app.UseCors("signalr");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using MessageThread.Models;
using Microsoft.AspNetCore.SignalR;

namespace MessageThread.Hubs;

public class NotifyHub : Hub
{
    public async Task SendMessage(Message newNote)
    {
        //First variable is the name of a method which must be identical to the one in the client
        await Clients.All.SendAsync("ReceiveMessage", newNote);
    }
}

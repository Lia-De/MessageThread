using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using MessageThread.Models;

namespace MessageThread.Data;

public class MessageContext: DbContext
{
    public MessageContext()
    {
    }
    public MessageContext(DbContextOptions<MessageContext> options) : base(options)
    {
        
    }

    public DbSet<Message> Messages { get; set; }
    public DbSet<MessageTree> MessageTrees { get; set; }

}

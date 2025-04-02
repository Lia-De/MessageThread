using System.ComponentModel.DataAnnotations;

namespace MessageThread.Models;

public class Message
{
    [Key] public int MessageId { get; set; }
    public required string Note { get; set; }
    public long Datestamp { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
}

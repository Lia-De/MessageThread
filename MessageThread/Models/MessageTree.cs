using System.ComponentModel.DataAnnotations;

namespace MessageThread.Models;

public class MessageTree
{
    [Key] public int TreeId { get; set; }
    public required string Name { get; set; }
    public List<Message> Messages { get; set; } = [];
}

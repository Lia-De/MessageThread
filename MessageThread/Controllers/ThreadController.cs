using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using Microsoft.EntityFrameworkCore;
using MessageThread.Data;
using MessageThread.Models;
using MessageThread.DTO;

namespace MessageThread.Controllers;

[ApiController]
public class ThreadController : ControllerBase
{
    private readonly MessageContext _context;
    public ThreadController(MessageContext context)
    {
        _context = context;
    }
    [HttpGet]
    [Route("/")]
    public IActionResult ListAllTrees()
    {
        return Ok(_context.MessageTrees
                    .Include(t => t.Messages)
                    .ToList());
    }

    [HttpGet]
    [Route("/getMyTree/{myTreeId}")]
    public IActionResult GetMyTree(int myTreeId)
    {
        var myTree = _context.MessageTrees
                    .Include(t=>t.Messages)
                    .ToList()
                    .FirstOrDefault(tree => tree.TreeId == myTreeId);
        if (myTree == null)
            return NotFound();

        return Ok(myTree);
    }


    [HttpGet]
    [Route("/msgs")]
    public IActionResult ListAllMessages()
    {
        return Ok(_context.Messages.ToList());
    }

    [HttpPost]
    [Route("/addTree")]
    public IActionResult AddTree(DTOMessage newTree)
    {
        if (string.IsNullOrEmpty(newTree.Note))
        {
            return BadRequest("Must name new Tree");
        }

        var messageTree = new MessageTree() { Name = newTree.Note };
        _context.Add(messageTree);
        _context.SaveChanges();
        return Ok(messageTree);
    }

    [HttpPost]
    [Route("/addNote/{treeId}")]
    public IActionResult AddNote(DTOMessage newNote, int treeId)
    {
        Message message = new Message() { Note = newNote.Note };
        if (newNote.Author != null)
        {
            message.Author = newNote.Author;
        } 
            var allThreads = _context.MessageTrees.ToList();
        MessageTree treeToAddTo;
        if (allThreads.Count<1)
        {
            // If there is no tree- create new one and name if after the first note
            treeToAddTo = new MessageTree() { Name =newNote.Note };
            treeToAddTo.Messages.Add(message);
            _context.Add(treeToAddTo);
        } else
        {
            // Check the tree we want to add to exists
            treeToAddTo = allThreads.Find(t => t.TreeId == treeId);
            if (treeToAddTo != null)
            {
                treeToAddTo.Messages.Add(message);
            }
            else
            {
                // Otherwise (looking for an ID that does not exist) 
                return BadRequest();
            }
        }

            _context.SaveChangesAsync();
        return Ok(message);

    }
}

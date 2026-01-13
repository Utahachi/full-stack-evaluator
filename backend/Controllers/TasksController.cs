using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

using TaskManager.Models;
using TaskManager.Data;
using TaskManager.DTOs;

namespace TaskManager.Controllers
{
    [Route("tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetAll()
        {
            var tasks = await _context.Tasks
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    IsDone = t.IsDone,
                    UserId = t.UserId
                }).ToListAsync();

            return Ok(tasks);
        }
        
        // GET /tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskResponseDto>> GetById(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            return Ok(new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId
            });
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                return BadRequest("User not found");

            var task = new TaskItem
            {
                Title = dto.Title,
                IsDone = dto.IsDone,
                UserId = dto.UserId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Map to DTO
            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                IsDone = task.IsDone,
                UserId = task.UserId
            };

            return Ok(response);
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem updated)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            // Check if the user exists
            var user = await _context.Users.FindAsync(updated.UserId);
            if (user == null) return BadRequest("User not found");

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;
            await _context.SaveChangesAsync();

            // Return a clean response
            return Ok(new
            {
                task.Id,
                task.Title,
                task.IsDone,
                task.UserId
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

namespace TaskManager.DTOs
{
    public class TaskResponseDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public bool IsDone { get; set; }
        public int UserId { get; set; }
    }
}
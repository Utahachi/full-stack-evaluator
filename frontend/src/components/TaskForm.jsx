function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  return (
    <form onSubmit={() => onSubmit({ title })}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button>Create</button>
    </form>
  );
}
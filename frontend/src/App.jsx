import './App.css';                 // styles for the app
import TaskList from './components/TaskList';  // fetches data from backend

function App() {
  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
      <TaskList />                 {/* replaces old <Tasks /> */}
    </div>
  );
}

export default App;

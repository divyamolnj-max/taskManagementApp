import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const addTask = (title) => {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title, completed: false }
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "COMPLETED") return task.completed;
    if (filter === "PENDING") return !task.completed;
    return true;
  });

  const pendingCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app">
      <h2>Task Management App</h2>

      <TaskInput addTask={addTask} />

      <FilterBar filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <p>Pending Tasks: <b>{pendingCount}</b></p>
    </div>
  );
}

export default App;

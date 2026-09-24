import { useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from './api'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await getTasks()
      setTasks(res.data)
      setError(null)
    } catch (err) {
      setError('Could not reach backend. Is the Spring Boot server running on port 8080?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      await createTask({ title, description, completed: false })
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch (err) {
      setError('Failed to add task.')
    }
  }

  const handleToggle = async (task) => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed })
      fetchTasks()
    } catch (err) {
      setError('Failed to update task.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      fetchTasks()
    } catch (err) {
      setError('Failed to delete task.')
    }
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p className="subtitle">React frontend &rarr; Spring Boot backend (H2 in-memory DB)</p>

      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading tasks...</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div onClick={() => handleToggle(task)} className="task-text">
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
            </div>
            <button className="delete-btn" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {!loading && tasks.length === 0 && !error && <p>No tasks yet. Add one above.</p>}
    </div>
  )
}

export default App

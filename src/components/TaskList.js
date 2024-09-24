import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch tasks from backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setTasks([]); // Set tasks to an empty array or handle accordingly
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err); // Set error state
      } finally {
        setLoading(false); // Set loading to false regardless of the outcome
      }
    };

    fetchTasks();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // Show error state if there was an error
  if (error) {
    return <div>Error fetching tasks: {error.message}</div>;
  }

  return (
    <div>
      <h3>Task List</h3>
      {tasks.length === 0 ? ( // Check if tasks are empty
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

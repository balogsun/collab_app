import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend
    axios.get('/api/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Task List</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching tasks with a timeout
    const fetchTasks = () => {
      // Example static tasks data
      const staticTasks = [
        { id: 1, name: 'Task 1', status: 'In Progress' },
        { id: 2, name: 'Task 2', status: 'Completed' },
        { id: 3, name: 'Task 3', status: 'Pending' },
      ];

      // Simulate a network delay
      setTimeout(() => {
        setTasks(staticTasks);
        setLoading(false); // Set loading to false after "fetching"
      }, 1000); // Adjust timeout as needed
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h3>Task List</h3>
      {tasks.length === 0 ? (
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

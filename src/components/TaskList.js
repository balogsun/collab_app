import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import { listTasks } from '../graphql/queries';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
 
        if (response.headers['content-type'].includes('application/json')) {
          if (Array.isArray(response.data)) {
            setTasks(response.data);
          } else {
            throw new Error("Expected an array but got an unexpected format.");
          }
        } else {
          throw new Error("Response is not JSON.");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id || task._id}>
              {task.name || task.title} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

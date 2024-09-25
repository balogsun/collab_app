import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'; // Import Amplify functionalities
import { listTasks } from './graphql/queries'; // Import GraphQL query to fetch tasks
import { onCreateTask } from './graphql/subscriptions'; // Import GraphQL subscription for real-time updates
import Amplify from 'aws-amplify';
import config from './aws-exports'; // AWS configuration

// Import your existing components
import Dashboard from './components/Dashboard';
import FeatureRequest from './components/FeatureRequest';
import Messages from './components/Messages';
import ProgressTracker from './components/ProgressTracker';
import TaskList from './components/TaskList';
import './styles.css'; // Import your CSS

// Configure Amplify
Amplify.configure(config);

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the GraphQL API on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch existing tasks from the API
  const fetchTasks = async () => {
    try {
      const taskData = await API.graphql(graphqlOperation(listTasks));
      setTasks(taskData.data.listTasks.items); // Set fetched tasks to state
    } catch (error) {
      console.error('Error fetching tasks:', error); // Handle errors
    }
  };

  // Subscribe to real-time task creation events using GraphQL subscription
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateTask)
    ).subscribe({
      next: (eventData) => {
        const newTask = eventData.value.data.onCreateTask; // Extract new task from event data
        setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the existing list
      }
    });

    // Cleanup: Unsubscribe from the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>Seun Application</h1>

      {/* Existing Components */}
      <Dashboard />
      <FeatureRequest />
      <Messages />
      <ProgressTracker />
      <TaskList />

      {/* Render Task List */}
      <div className="task-list-container">
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li> // Display task titles
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

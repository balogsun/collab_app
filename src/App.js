import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { listTasks } from './graphql/queries';
import { onCreateTask } from './graphql/subscriptions';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './aws-exports';

// Import your existing components
import Dashboard from './components/Dashboard';
import FeatureRequest from './components/FeatureRequest';
import Messages from './components/Messages';
import ProgressTracker from './components/ProgressTracker';
import TaskList from './components/TaskList';
import './styles.css';

// Configure Amplify
Amplify.configure(config);

// Generate API client
const client = generateClient();

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const taskData = await client.graphql({ query: listTasks });
      setTasks(taskData.data.listTasks.items);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    const subscription = client.graphql({ query: onCreateTask }).subscribe({
      next: (eventData) => {
        const newTask = eventData.value.data.onCreateTask;
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <h1>Seun Application</h1>
          <button onClick={signOut}>Sign out</button>

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
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;

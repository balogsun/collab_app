import React from 'react';
import TaskList from './TaskList';
import ProgressTracker from './ProgressTracker';
import FeatureRequest from './FeatureRequest';
import Messages from './Messages';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TaskList />
      <ProgressTracker />
      <FeatureRequest />
      <Messages />
    </div>
  );
};

export default Dashboard;

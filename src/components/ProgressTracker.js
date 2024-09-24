import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch project progress from backend
    axios.get('/api/progress').then((response) => {
      setProgress(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Project Progress</h3>
      <progress value={progress} max="100">{progress}%</progress>
    </div>
  );
};

export default ProgressTracker;

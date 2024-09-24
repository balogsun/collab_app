import React, { useState } from 'react';
import axios from 'axios';

const FeatureRequest = () => {
  const [feature, setFeature] = useState('');

  const submitFeature = () => {
    axios.post('/api/feature-requests', { description: feature }).then(() => {
      setFeature('');
    });
  };

  return (
    <div>
      <h3>Feature Request</h3>
      <input
        value={feature}
        onChange={(e) => setFeature(e.target.value)}
        placeholder="Describe your feature request"
      />
      <button onClick={submitFeature}>Submit</button>
    </div>
  );
};

export default FeatureRequest;

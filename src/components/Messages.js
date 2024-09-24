import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch existing messages from backend
    axios.get('/api/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

  const sendMessage = () => {
    axios.post('/api/messages', { text: newMessage }).then(() => {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage('');
    });
  };

  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messages;

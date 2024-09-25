import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API, graphqlOperation } from 'aws-amplify';
import { listMessages } from '../graphql/queries';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        
        if (response.headers['content-type'].includes('application/json')) {
          if (Array.isArray(response.data)) {
            setMessages(response.data);
          } else {
            throw new Error("Expected an array but got an unexpected format.");
          }
        } else {
          throw new Error("Response is not JSON.");
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      const response = await axios.post('/api/messages', { text: newMessage });
      
      if (response.data && typeof response.data === 'object') {
        setMessages([...messages, response.data]);
        setNewMessage('');
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err);
    }
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Messages</h3>
      {messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li key={message.id || index}>{message.text}</li>
          ))}
        </ul>
      )}
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

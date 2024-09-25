import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        console.log("Raw API response:", response);
        
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setError(new Error("Unexpected data format received from server"));
          setMessages([]);
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
        console.error("Unexpected response format:", response.data);
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

import React, { useState, useEffect } from 'react';
// Remove the axios import since we're using static data for now

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate fetching existing messages
    const fetchMessages = () => {
      // Example static messages data
      const staticMessages = [
        { text: 'Hello, world!' },
        { text: 'React is awesome!' },
        { text: 'How are you doing today?' },
      ];
      setTimeout(() => {
        setMessages(staticMessages);
        setLoading(false); // Set loading to false after "fetching"
      }, 1000); // Simulate a network delay
    };

    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      // Add the new message to the local state
      setMessages([...messages, { text: newMessage }]);
      setNewMessage(''); // Clear the input
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {messages.length === 0 ? (
          <li>No messages available.</li>
        ) : (
          messages.map((message, index) => (
            <li key={index}>{message.text}</li>
          ))
        )}
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

'use client';

import { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch('/api/messages');

        if (response.status === 200) {
          const messagesData = await response.json();
          setMessages(messagesData);
        }
      } catch (err) {
        console.error('Error fetching messaging');
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return <div>Messages</div>;
};

export default Messages;

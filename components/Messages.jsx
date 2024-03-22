'use client';

import { useEffect, useState } from 'react';

import Message from '@/components/Message';
import Spinner from '@/components/Spinner';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch('/api/messages');

        if (response.status === 200) {
          const messagesData = await response.json();
          setMessages(messagesData.messages);
        }
      } catch (err) {
        console.error('Error fetching messaging');
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p>You have no messages</p>
              ) : (
                messages.map((message) => {
                  return <Message key={message._id} message={message} />;
                })
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages;

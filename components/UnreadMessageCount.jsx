'use client';

import { useEffect, useState } from 'react';

const UnreadMessageCount = ({ session }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const getUnreadMessagesCount = async () => {
      try {
        const response = await fetch('/api/messages/unread-count');

        if (response.status === 200) {
          const { count } = await response.json();
          setUnreadCount(count);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUnreadMessagesCount();
  }, []);

  return (
    !loading && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;

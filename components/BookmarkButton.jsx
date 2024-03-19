'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Spinner from '@/components/Spinner';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIsBookmarked = async () => {
      try {
        const response = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchIsBookmarked();
    } else {
      setLoading(false);
    }
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to sign in to bookmark a property');
      return;
    }

    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;

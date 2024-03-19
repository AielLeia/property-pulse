'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch('/api/bookmarks');

        if (response.ok) {
          const data = await response.json();
          setProperties(data.properties);
        } else {
          console.log(response.statusText);
          toast.error('Failed to fetch properties');
        }
      } catch (err) {
        console.log(response.statusText);
        toast.error('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  console.log(properties);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

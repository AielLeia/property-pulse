'use client';

import { useEffect, useState } from 'react';

import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProperties(data.properties);
        setTotalProperties(data.totalProperties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties founds</p>
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

export default Properties;

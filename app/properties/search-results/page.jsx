'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const searchResult = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (searchResult.ok) {
          const data = await searchResult.json();
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Spinner from '@/components/Spinner';

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

  return (
    <>
      <section className="bg-blue-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm
            locationSearch={location}
            propertyTypeSearch={propertyType}
          />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
            </Link>
            <h1 className="text-2xl mb-4">Search result</h1>
            {properties.length === 0 ? (
              <p>No search result found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => {
                  return (
                    <PropertyCard key={property._id} property={property} />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
      )
    </>
  );
};

export default SearchResultsPage;

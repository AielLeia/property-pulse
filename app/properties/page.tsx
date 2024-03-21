import { fetchProperties } from '@/utils/requests';

import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';

const PropertiesPage = async () => {
  const { properties } = await fetchProperties();
  properties.sort(
    (p1, p2) =>
      new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime()
  );
  return (
    <>
      <section className="bg-blue-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
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
    </>
  );
};

export default PropertiesPage;

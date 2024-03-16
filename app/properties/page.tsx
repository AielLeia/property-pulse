import PropertyCard from '@/components/PropertyCard';

async function fetchProperties() {
  try {
    const propertiesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );

    if (!propertiesResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    return propertiesResponse.json();
  } catch (err) {
    console.log(err);
  }
}

const PropertiesPage = async () => {
  const { properties } = await fetchProperties();
  properties.sort(
    (p1, p2) =>
      new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime()
  );
  return (
    <div>
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
    </div>
  );
};

export default PropertiesPage;

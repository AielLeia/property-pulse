const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({ showFeature = false } = {}) {
  try {
    if (!API_DOMAIN) {
      return Promise.resolve([]);
    }

    const propertiesResponse = await fetch(
      `${API_DOMAIN}/properties${showFeature ? '/featured' : ''}`,
      {
        cache: 'no-store',
      }
    );

    if (!propertiesResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    return propertiesResponse.json();
  } catch (err) {
    console.log(err);
    return Promise.resolve([]);
  }
}

export async function fetchProperty(id) {
  try {
    if (!API_DOMAIN) {
      return Promise.resolve(null);
    }

    const propertyResponse = await fetch(`${API_DOMAIN}/properties/${id}`);

    if (!propertyResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    return propertyResponse.json();
  } catch (err) {
    console.log(err);
    return Promise.resolve(null);
  }
}

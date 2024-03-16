const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    if (!API_DOMAIN) {
      return Promise.resolve([]);
    }

    const propertiesResponse = await fetch(`${API_DOMAIN}/properties`);

    if (!propertiesResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    return propertiesResponse.json();
  } catch (err) {
    console.log(err);
    return Promise.resolve([]);
  }
}

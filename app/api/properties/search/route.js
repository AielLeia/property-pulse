import connectDb from '@/config/db.config';
import Property from '@/models/Property';

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  try {
    await connectDb();

    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    const locationPattern = new RegExp(location, 'i');

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    if (propertyType && propertyType !== 'All') {
      query.type = new RegExp(propertyType, 'i');
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

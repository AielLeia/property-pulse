import connectDb from '@/config/db.config';
import Property from '@/models/Property';

/**
 * Route: GET /api/properties
 *
 * @return {Promise<{properties: Property}>}
 */
export const GET = async () => {
  try {
    await connectDb();

    const properties = await Property.find({});

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      images,
    };

    console.log(propertyData);

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 500 });
  }
};

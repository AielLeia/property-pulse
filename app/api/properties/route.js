import connectDb from '@/config/db.config';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

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
    await connectDb();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const authUserId = userSession.userId;

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
      owner: authUserId,
      // images,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 201,
    // });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 500 });
  }
};

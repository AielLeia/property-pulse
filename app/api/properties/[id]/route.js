import cloudinary from '@/config/cloudinary.config';
import connectDb from '@/config/db.config';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

/**
 * Route: GET /api/properties/:id
 *
 * @param {import('next').NextApiRequest} request
 * @param {{params: { id: string }}}
 * @return {Promise<{properties: Property}>}
 */
export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response(JSON.stringify({ message: 'Property not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ properties: property }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

/**
 * Route: DELETE /api/properties/:id
 *
 * @param {import('next').NextApiRequest} request
 * @param {{params: { id: string }}}
 * @return {Promise<{properties: Property}>}
 */
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User id is required', { status: 401 });
    }

    const { userId } = userSession;

    await connectDb();

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response(JSON.stringify({ message: 'Property not found' }), {
        status: 404,
      });
    }

    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify({ message: 'Property deleted' }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

/**
 * Route: DELETE /api/properties/:id
 *
 * @param {import('next').NextApiRequest} request
 * @param {{params: { id: string }}}
 */
export const PUT = async (request, { params: { id } }) => {
  try {
    await connectDb();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const authUserId = userSession.userId;

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response(
        JSON.stringify({ message: 'Property does not exist' }),
        { status: 404 }
      );
    }

    if (existingProperty.owner.toString() !== authUserId) {
      return new Response(JSON.stringify({ message: 'Unauthorised' }), {
        status: 401,
      });
    }

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');

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
    };

    const property = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify({ property }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

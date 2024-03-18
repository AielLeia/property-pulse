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

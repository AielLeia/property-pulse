import connectDb from '@/config/db.config';
import Property from '@/models/Property';

/**
 * Route: GET /api/properties/user/:userId
 *
 * @param {import('next').NextApiRequest} request
 * @param {{params: { userId: string }}}
 * @return {Promise<{properties: Property[]}>}
 */
export const GET = async (request, { params }) => {
  try {
    await connectDb();

    const userId = params.userId;

    if (!userId) {
      return new Response('User id is required', { status: 404 });
    }

    const property = await Property.find({ owner: userId });

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

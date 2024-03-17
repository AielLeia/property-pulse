import connectDb from '@/config/db.config';
import Property from '@/models/Property';

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

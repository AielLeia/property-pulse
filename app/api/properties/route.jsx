import connectDb from '@/config/db.config';
import Property from '@/models/Property';

/**
 * Route: GET /api/properties
 *
 * @param {import('next').NextApiRequest} request
 * @return {Promise<{properties: Property}>}
 */
export const GET = async (request) => {
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

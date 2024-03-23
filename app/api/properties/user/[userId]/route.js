import connectDb from '@/config/db.config';
import Property from '@/models/Property';

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

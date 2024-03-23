import connectDb from '@/config/db.config';
import Property from '@/models/Property';

export const GET = async () => {
  try {
    await connectDb();

    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

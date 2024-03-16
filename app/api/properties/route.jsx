import connectDb from '@/config/db.config';

export const GET = async (request) => {
  try {
    await connectDb();

    return new Response(JSON.stringify({ message: 'Hello world' }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

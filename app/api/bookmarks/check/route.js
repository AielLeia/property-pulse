import connectDb from '@/config/db.config';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDb();

    const { propertyId } = await request.json();
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response('User id is required', { status: 401 });
    }

    const { userId } = userSession;

    const user = await User.findOne({ _id: userId });

    const isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

import connectDb from '@/config/db.config';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDb();

    const userSession = await getSessionUser();
    if (!userSession || !userSession.userId) {
      return new Response('User id is required', { status: 401 });
    }

    const { userId } = userSession;
    const user = await User.findOne({ _id: userId });

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify({ properties: bookmarks }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
};

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

    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ isBookmarked, message }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

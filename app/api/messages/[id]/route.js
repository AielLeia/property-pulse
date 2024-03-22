import connectDb from '@/config/db.config';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const PUT = async (request, { params }) => {
  try {
    await connectDb();

    const { id } = params;
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { status: 401 }
      );
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (!message) return new Response('message not found', { status: 400 });

    if (message.recipient.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (err) {
    return new Response('Something went wrong', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDb();

    const { id } = params;
    const userSession = await getSessionUser();

    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: 'You must be logged in to send a message' }),
        { status: 401 }
      );
    }

    const { userId } = userSession;

    const message = await Message.findById(id);

    if (!message) return new Response('message not found', { status: 400 });

    if (message.recipient.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await message.deleteOne();

    return new Response(
      JSON.stringify({ message: 'Message successfully deleted' }),
      { status: 201 }
    );
  } catch (err) {
    return new Response('Something went wrong', { status: 500 });
  }
};
